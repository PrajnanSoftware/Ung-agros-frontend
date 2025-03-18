import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItemsComponent from '../components/CartItemsComponent';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import axios from 'axios';
import PaymentSuccessPage from './PaymentSuccessPage';
import PaymentFailurePage from './PaymentFailurePage';
import { getCart } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
    const { checkoutData, cart, cartLoading } = useSelector((state) => state.cart);
    const {isAuthenticated, user } = useSelector((state) => state.user);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0); 
    const [sgst, setSgst] = useState(0); 
    const [cgst, setCgst] = useState(0); 
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        console.log("use effect")
        if (checkoutData) {
            console.log("setting total")
            const amountAfterTax = checkoutData.totalPrice;
            setAmount(amountAfterTax)
            setCgst(((amountAfterTax/100)*9).toFixed(2));
            setSgst(((amountAfterTax/100)*9).toFixed(2));
            setTotal((amountAfterTax+parseFloat(((amountAfterTax/100)*9).toFixed(2))+parseFloat(((amountAfterTax/100)*9).toFixed(2))).toFixed(2));
        }
    }, [checkoutData]);

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
            if (!isLoaded) return console.log("Razorpay SDK failed to load");
            
            const { data } = await axiosInstance.post('/payment/create-rp-order', {amount: total});
            
            console.log(data.data);
            const options = {
                key: "rzp_test_QnZqng7pQVvf4L",
                amount: data.data.amount,
                currency: data.data.currency,
                name: "Ung Agro",
                description: "Order Payment",
                order_id: data.data.id,
                handler: async (response) => {
                    console.log(response);
                    const verifyRes = await axiosInstance.post('/payment/verify-rp-payment', response);
                    console.log(verifyRes);
                    if (verifyRes.data.success) {
                        console.log("Payment Successful");
                        toast.success('Payment successful');
                        const order = await axiosInstance.post('/order', 
                            {
                                items: checkoutData.items,
                                totalPrice: total,
                                orderStatus: "Pending",
                                paymentStatus: "Paid", 
                                paymentInfo: {
                                    razorpaySignature: verifyRes.data.data.razorpay_signature,
                                    razorpayPaymentId: verifyRes.data.data.razorpay_payment_id,
                                    razorpayOrderId: verifyRes.data.data.razorpay_order_id
                                }, 
                                billDetails: {
                                    subTotal: amount,
                                    sgst: sgst,
                                    cgst: cgst,
                                    total: total
                                }
                            });
                    if (order.data.status === 'success') {
                        toast.success('Order successful');
                        navigate('/payment-success');
                        dispatch(getCart());
                    } else {
                        toast.error('Payment failed');
                        navigate('/payment-failure');
                    }
                    } else {
                        toast.error('Order failed');
                        navigate('/payment-failure');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone
                },
                theme: {
                    color: "#3399cc",
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            setLoading(false)
            console.error("Error:", error);   
        } finally {
            setLoading(false)
        }
    }

    if (cartLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    }
    if (!checkoutData) 
        return <div className='min-h-[calc(100vh-200px)] flex items-center justify-center'>
             <div className='text-center flex flex-col'><h3>Something went wrong.</h3>  <p>Back to <a href="/cart" className='text-blue-700 underline'>Cart</a></p></div>;  
        </div>

  return (
    <div className='p-4'>
        <h1 className='text-2xl font-bold'>Checkout</h1>
        <div className='flex flex-col lg:flex-row'>
            <div className='flex-auto'>
                <h3 className='text-xl font-semibold'>Order Summary</h3>
                <div className='max-h-[calc(100vh-100px)] overflow-y-auto'>
                    {checkoutData.items.map((item, index) => {
                        const cartItem = cart.find((c) => c.product._id === item.product);
                        console.log("Hi", cartItem);
                        return (
                            <div className='relative flex gap-4 items-center border p-2 rounded-lg m-2 pr-8'>
                                    <img src={cartItem.product.image[0] ? cartItem.product.image[0] : '/no-image.jpg'} alt="itemname" width={100} height={150}/>
                                    <div className='flex flex-col ml-2 w-full justify-between h-full gap-4'>
                                        <div className=''>
                                            <p className='overflow-hidden lg:overflow-visible text-ellipsis'>{cartItem.product.name}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='flex px-1 order-1 lg:order-none w-fit items-center'>
                                                <p className='px-2'>{item.quantity}</p>
                                            </div>
                                            <div className='order-1 lg:order-none text-right'>
                                                <p>${item.totalProductPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </div>
            </div>
            <div className=''>
                <h3 className='text-xl font-semibold' >Order Summary</h3>
                <hr className='my-4'/>
                <div className='grid grid-cols-3 gap-x-10 gap-y-2 text-nowrap px-4'>
                    <p className='col-span-2'>Subtotal</p>
                    <p>${amount}</p>
                    <p className='col-span-2'>CGST</p>
                    <p>${cgst}</p>
                    <p className='col-span-2'>SGST</p>
                    <p>${sgst}</p>
                    <hr className='my-4 col-span-2'/>
                    <h4 className='col-span-2'>Total</h4>
                    <p>${total}</p>
                </div>
                <div>
                    <button className={`w-full p-2 rounded-lg my-2 ${cart.length === 0 || !checkoutData || loading ? "opacity-60 cursor-not-allowed bg-gray-400" : "bg-primary hover:bg-primary-dark"}`} disabled={!checkoutData || cart.length === 0 || loading} onClick={handlePayment}>
                        {
                            loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : `Pay ${total}` 
                        } 
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutPage