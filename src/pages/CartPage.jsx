import React, { useEffect, useState } from 'react'
import CartItemsComponent from '../components/CartItemsComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { checkoutCart } from '../redux/slice/cartSlice';
import { axiosInstance } from '../utils/axiosInstance';
import { getUserAddress } from '../redux/slice/userSlice';
import ModalComponent from '../components/ModalComponent';
import AddressFormComponent from '../components/AddressFormComponent';
import { MdCurrencyRupee } from 'react-icons/md'; 
import { toast } from 'react-toastify';


const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, cartLoading, cartCheckoutError, cartError } = useSelector((state) => state.cart);
    const { user, userAddress, loading, userAddressError } = useSelector((state) => state.user);
    const [openAddressForm, setOpenAddressForm] = useState(false);
    const [total, setTotal] = useState(0);
    const [saving, setSaving] = useState(0);
    const [ addressError, setAddressError ] = useState(null);
    const [ addressLoading, setAddressLoading] = useState(false);
    const [outOfStock, setOutOfStock] = useState([]);
    const unavailable = [];


    useEffect(() => {
        const outOfStockItems = cart.filter(item => item.quantity > item.product.quantity).map(item => item.product.name);
        setOutOfStock(outOfStockItems);
    }, [cart]);

    useEffect( () => {
        if (cart.length !== 0) {
            setTotal(cart.reduce((acc, item) => acc + item.product.sellingPrice * item.quantity, 0));
            setSaving(cart.reduce((acc, item) => acc + ((item.product.price * item.quantity) - (item.product.sellingPrice * item.quantity)), 0));
        } else {
            setSaving(0);
            setTotal(0);
        }
    }, [cart])
    
    useEffect(() => {
        if (user) {
            dispatch(getUserAddress());
        } else {
            navigate('/login')
        }
    }, [dispatch, user]);


    // useEffect(() => {
    //     if (!cartCheckoutError && !cartLoading && cart.length > 0) {
    //         
    //     }
    // }, [cartCheckoutError, cartLoading, cart, navigate]);
    // TODO: Handle Checkout 
    const handleCheckout = async () => {
        try {
            
            if (userAddress) {
                const checoutResponse = await dispatch(checkoutCart()).unwrap();
                console.log(checoutResponse)
                navigate('/checkout');
            }
        } catch (error) {
         toast.error(error.message)   
        }
        
    }

    const handleAddressToggle = () => setOpenAddressForm(prev => !prev) 

    if (cartLoading) 
        return (<div className="flex justify-center items-center min-h-screen" >
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>);

    if (cartError) 
        return (<div className='min-h-[calc(100vh-200px)] flex justify-center items-center' >
            <p>Something went wrong</p>
        </div>);

  return (
    <div className='py-10 px-5 flex flex-col lg:flex-row justify-center gap-10 lg: gap:20' >
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
                        <button className='bg-blue-500 text-white h-fit px-2 rounded-md' onClick={handleAddressToggle}>Edit</button>
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
                        return <CartItemsComponent key={index} productId={item.product._id} name={item.product.name} imgUrl={item.product.image && item.product.image[0]} price={item.product.sellingPrice} quantity={item.quantity} avlQty={item.product.quantity}/>
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
                <p className='flex items-center'><MdCurrencyRupee /> {total}</p>
                <p>Savings</p> 
                <p className='flex items-center text-sm text-primary'><MdCurrencyRupee /> {saving}</p>
                <hr className='my-4 col-span-2'/>
                <h4>Total</h4>
                <p className='flex items-center'><MdCurrencyRupee /> {total}</p>
            </div>
            <div>
                {(outOfStock.length > 0) && <p className='text-red-500 pl-2 pt-4 pb-0'>

                    { outOfStock.map((item) => item).join(", ")}{" is Out of Stock, Please remove it to proceed."}
                </p>}
                <button className={`text-white bg-primary w-full p-2 rounded-lg my-2 ${cart.length === 0 || cartLoading || !userAddress || outOfStock.length !== 0 ? "opacity-60 cursor-not-allowed " : ""}`} disabled={ outOfStock.length !== 0 || cart.length === 0 || cartLoading || !userAddress} onClick={handleCheckout}>
                    {cartLoading ? "Loading..." : "Checkout" }
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartPage