import React, { useEffect, useState } from 'react'
import CartItemsComponent from '../components/CartItemsComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { checkoutCart } from '../redux/slice/cartSlice';
import { getAddress } from '../api/addressApi';
import { axiosInstance } from '../utils/axiosInstance';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, cartLoading, cartCheckoutError } = useSelector((state) => state.cart);
    const [total, setTotal] = useState(0);
    const [charges, setCharges] = useState(0);
    const [address, setAddress] = useState();
    const [ addressError, setAddressError ] = useState(null);
    const [ addressLoading, setAddressLoading] = useState(false);

    useEffect( () => {
        if (cart.length !== 0) {
            setTotal(cart.reduce((acc, item) => acc + item.product.sellingPrice * item.quantity, 0));
            setCharges((total/100) * 2);
        } else {
            setCharges(0);;
            setTotal(0)
        }
    }, [cart])

    useEffect( () => {
        const fetchAddress = async () => {
            try {
                setAddressLoading(true);
                const response = await axiosInstance.get('/address');
                if(response.data.status !== "success") {
                    throw new Error("Failed to fetch Address");
                }
                console.log(response);
                const addressData = response.data;
                setAddress(addressData.data);
            } catch (error) {
                setAddressError(error);
            } finally {
                setAddressLoading(false);
            }
        }
        fetchAddress()
    }, []);

    // useEffect(() => {
    //     if (!cartCheckoutError && !cartLoading && cart.length > 0) {
    //         
    //     }
    // }, [cartCheckoutError, cartLoading, cart, navigate]);
    // TODO: Handle Checkout 
    const handleCheckout = () => {
        dispatch(checkoutCart());
        navigate('/checkout');
        
    }

    if (addressLoading) return <p>Loading...</p>;
    if (addressError) return <p>Error: {addressError.message}</p>;

  return (
    <div className='p-10 flex flex-col lg:flex-row justify-center gap-10 lg: gap:20'>
        <div className='flex-auto'>
            <h3 className='text-2xl font-bold'>My Cart</h3>
            <hr className='my-4'/>
            {
                address ? (
                    <div className='flex justify-between items-center border p-2 rounded-md'>
                        <div>
                        <p>Deliver to: <span>{address.name}</span></p>
                        <p>{`${address.buildingName}, ${address.streat}, ${address.landmark}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`}</p>
                        </div>
                        <button className='bg-blue-500  h-fit px-2 rounded-md'>Edit</button>
                    </div>
                ) : (<div>
                    {/* <p>Please select address</p> */}
                    <button className='bg-blue-500 px-2 py-1 rounded-md text-white'>+ Add a new Address*</button>
                </div>)
            }
            <h4 className='font-semibold'>Products</h4>
            {
                cart.length == 0 ? <div className='text-center py-4'>No Cart Items</div> :
                <div className='h-96 overflow-y-auto'>
                {
                    cart.map((item, index) => {
                        return <CartItemsComponent key={index} productId={item.product._id} name={item.product.name} imgUrl={item && item[0]} price={item.product.sellingPrice} quantity={item.quantity} avlQty={item.product.quantity}/>
                    })
                }

            </div>
            }
            
            <hr className='my-4'/>
        </div>
        <div className='flex-1'>
            <h3 className='text-2xl font-bold' >Price Details</h3>
            <hr className='my-4'/>
            <div className='grid grid-cols-2 gap-x-52 lg:gap-x-60 gap-y-2 text-nowrap '>
                <p>Subtotal</p>
                <p>${total}</p>
                <p>Extra Charges</p>
                <p>${charges}</p>
                <hr className='my-4 col-span-2'/>
                <h4>Total</h4>
                <p>${total+charges}</p>
            </div>
            <div>
                <button className={`bg-primary w-full p-2 rounded-lg my-2 ${cart.length === 0 ? "opacity-60 cursor-not-allowed " : ""}`} disabled={cart.length === 0 || cartLoading } onClick={handleCheckout}>
                    {cartLoading ? "Loading..." : "Checkout" }
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartPage