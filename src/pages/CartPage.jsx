import React, { useEffect, useState } from 'react'
import CartItemsComponent from '../components/CartItemsComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { checkoutCart } from '../redux/slice/cartSlice';
import { axiosInstance } from '../utils/axiosInstance';
import { getUserAddress } from '../redux/slice/userSlice';
import ModalComponent from '../components/ModalComponent';
import AddressFormComponent from '../components/AddressFormComponent';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, cartLoading, cartCheckoutError } = useSelector((state) => state.cart);
    const { user, userAddress, loading, userAddressError } = useSelector((state) => state.user);
    const [openAddressForm, setOpenAddressForm] = useState(false);
    const [total, setTotal] = useState(0);
    const [charges, setCharges] = useState(0);
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
    
    useEffect(() => {
        if (user) {
            dispatch(getUserAddress());
        } else {
            navigate('/login')
        }
    }, [dispatch]);


    // useEffect(() => {
    //     if (!cartCheckoutError && !cartLoading && cart.length > 0) {
    //         
    //     }
    // }, [cartCheckoutError, cartLoading, cart, navigate]);
    // TODO: Handle Checkout 
    const handleCheckout = () => {
        if (userAddress) {
            dispatch(checkoutCart());
            navigate('/checkout');
        }
        
    }

    const handleAddressToggle = () => setOpenAddressForm(prev => !prev) 

    // if (loading) return <p>Loading...</p>;
    // if (userAddressError || cartCheckoutError) return <p>Error: {addressError.message}</p>;

  return (
    <div className='p-10 flex flex-col lg:flex-row justify-center gap-10 lg: gap:20'>
        <div className='flex-auto'>
            <h3 className='text-2xl font-bold'>My Cart</h3>
            <hr className='my-4'/>
            {
                userAddress ? (
                    <div className='flex justify-between items-center border p-2 rounded-md'>
                        <div>
                        <p>Deliver to: <span>{userAddress.fullName}</span></p>
                        <p>{`${userAddress?.buildingName}, ${userAddress?.street}, ${userAddress?.landmark}, ${userAddress?.city}, ${userAddress?.state}, ${userAddress?.country}, ${userAddress?.zipCode}`}</p>
                        </div>
                        <button className='bg-blue-500  h-fit px-2 rounded-md' onClick={handleAddressToggle}>Edit</button>
                        <ModalComponent isOpen={openAddressForm} handleClose={handleAddressToggle}>
                            <AddressFormComponent address={userAddress} togglePopup={handleAddressToggle}/>
                        </ModalComponent>
                    </div>
                ) : (<div className='flex justify-between my-2'>
                    <p>No Address Selected, Please Add address</p>
                    <button className='bg-blue-500 px-2 py-1 rounded-md text-white' onClick={handleAddressToggle}>+ Add a new Address*</button>
                    <ModalComponent isOpen={openAddressForm} handleClose={handleAddressToggle}>
                        <AddressFormComponent togglePopup={handleAddressToggle}/>
                    </ModalComponent>
                </div>)
            }
            <h4 className='font-semibold'>Products</h4>
            {
                cart.length == 0 ? <div className='text-center py-4'>No Cart Items</div> :
                <div className='max-h-[calc(100vh - 100px)] overflow-y-auto'>
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
                <button className={`bg-primary w-full p-2 rounded-lg my-2 ${cart.length === 0 || cartLoading || !userAddress ? "opacity-60 cursor-not-allowed " : ""}`} disabled={cart.length === 0 || cartLoading || !userAddress} onClick={handleCheckout}>
                    {cartLoading ? "Loading..." : "Checkout" }
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartPage