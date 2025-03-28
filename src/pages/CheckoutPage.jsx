import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { getCart } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { MdCurrencyRupee } from 'react-icons/md';
import AOS from 'aos';

const CheckoutPage = () => {
    const { checkoutData, cart, cartLoading } = useSelector((state) => state.cart);
    const {isAuthenticated, user } = useSelector((state) => state.user);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    const handlePayment = async (e) => {
        try {
            setLoading(true);
            const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!isLoaded) {
                toast.error("Failed to load Razorpay");
                setLoading(false);
                console.log("Razorpay SDK failed to load");
                return 
            }
            
            console.log(isLoaded)
            const { data } = await axiosInstance.post('/payment/create-rp-order', {amount: checkoutData.totalPrice + checkoutData.totalTax});
            
            console.log(data.data);
            const options = {
                // key: "rzp_test_pxFBRXS7B6uJsX",
                key: "rzp_live_qjGjzhyc9USBMg",
                amount: data.data.amount,
                currency: data.data.currency,
                name: "Ung Agro",
                description: "Order Payment",
                order_id: data.data.id,
                handler: async (response) => {
                    try {
                        setLoading(true);
                    
                        console.log(response);
                        const verifyRes = await axiosInstance.post('/payment/verify-rp-payment', response);
                        console.log(verifyRes);
                        if (verifyRes.data.success) {
                            console.log("Payment Successful");
                            toast.success('Payment successful');
                            const order = await axiosInstance.post('/order', 
                                {
                                    items: checkoutData.items,
                                    totalPrice: checkoutData.totalPrice + checkoutData.totalTax,
                                    orderStatus: "Pending",
                                    paymentStatus: "Paid", 
                                    paymentInfo: {
                                        razorpaySignature: verifyRes.data.data.razorpay_signature,
                                        razorpayPaymentId: verifyRes.data.data.razorpay_payment_id,
                                        razorpayOrderId: verifyRes.data.data.razorpay_order_id
                                    }, 
                                    billDetails: {
                                        subTotal: checkoutData.totalPrice,
                                        totalTax: checkoutData.totalTax,
                                        total: checkoutData.totalPrice + checkoutData.totalTax
                                    }
                                });
                            setLoading(false);
                            if (order.data.status === 'success') {
                                toast.success('Order placed successful');
                                navigate('/payment-success');
                                dispatch(getCart());
                            } else {
                                toast.error('Order creation failed');
                                navigate('/payment-failure');
                            }
                        } else {
                            toast.error('Payment processing or order creation failed');
                            navigate('/payment-failure');
                        }
                    } catch (error) {
                        console.log(error)
                        setLoading(false)
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone
                },
                theme: {
                    color: "#38B54A",
                },
                onClose: () => {
                    console.log("OnClose executed")
                    toast.info("Payment was not completed");
                    setLoading(false);
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
            setLoading(false)
        } catch (error) {
            toast.error('An error occurred during payment processing.');
            setLoading(false)
            console.error("Error:", error);   
        }
    }

    if (cartLoading) {
        return <div className="flex justify-center items-center min-h-screen" >
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    }
    if (!checkoutData) 
        return <div className='min-h-[calc(100vh-200px)] flex items-center justify-center' >
             <div className='text-center flex flex-col'><h3>Something went wrong.</h3>  <p>Back to <a href="/cart" className='text-blue-700 underline'>Cart</a></p></div>;  
        </div>

  return (
    <div className='p-4 m-4'>
        <h1 className='text-2xl font-bold'>Checkout</h1>
        <div className='flex flex-col lg:flex-row gap-10'>
            <div className='flex-auto'>
                <h3 className='text-xl font-semibold'>Order Summary</h3>
                <div className='max-h-[calc(100vh-100px)] overflow-y-auto'>
                    {checkoutData.items.map((item, index) => {
                        const cartItem = cart.find((c) => c.product._id === item.product);
                        return (
                            <div key={index} className='relative flex gap-4 items-center border p-2 rounded-lg m-2 pr-8'>
                                    <img src={cartItem.product.image[0] ? cartItem.product.image[0] : '/no-image.jpg'} alt="itemname" width={100} height={150}/>
                                    <div className='flex flex-col ml-2 w-full justify-between h-full gap-4'>
                                        <div className=''>
                                            <p className='overflow-hidden lg:overflow-visible text-ellipsis'>{cartItem.product.name}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='flex order-1 lg:order-none w-fit items-center text-wrap'>
                                                <p >Qty: {item.quantity}</p>
                                            </div>
                                            <div className='order-1 lg:order-none text-right'>
                                                <p className='flex items-center'><MdCurrencyRupee />{item.totalProductPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex-1'>
                <h3 className='text-xl font-semibold' >Order Summary</h3>
                <hr className='my-4'/>
                <div >
                    <div className='flex justify-between'>
                        <p className='col-span-2'>Subtotal</p>
                        <p className='flex items-center'><MdCurrencyRupee />{checkoutData.totalPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='col-span-2'>GST</p>
                        <p className='flex items-center'><MdCurrencyRupee />{checkoutData.totalTax}</p>
                    </div>
                    {/* <p className='col-span-2'>SGST</p> */}
                    {/* <p className='flex items-center'><MdCurrencyRupee />{sgst}</p> */}
                    <hr className='my-4 col-span-2'/>
                    <div className='flex justify-between'>
                        <h4 className='col-span-2'>Total</h4>
                        <p className='flex items-center'><MdCurrencyRupee />{checkoutData.totalPrice + checkoutData.totalTax}</p>
                    </div>
                </div>
                <div>
                    <button className={`w-full p-2 rounded-lg my-2 ${cart.length === 0 || !checkoutData || loading ? "opacity-60 cursor-not-allowed bg-gray-400" : "bg-primary hover:bg-primary-dark"}`} disabled={!checkoutData || cart.length === 0 || loading} onClick={handlePayment}>
                        {
                            loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) :(<p className='flex items-center justify-center text-white'>Pay <span className='flex items-center justify-center ml-2'><MdCurrencyRupee />{checkoutData.totalPrice + checkoutData.totalTax}</span></p>)
                        } 
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPage