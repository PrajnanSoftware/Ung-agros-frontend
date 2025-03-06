import React, { useEffect, useState } from 'react'
import CartItemsComponent from '../components/CartItemsComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const [total, setTotal] = useState(0);
    const [charges, setCharges] = useState(0);

    useEffect(() => {
        if (cart.length !== 0) {
            setTotal(cart.reduce((acc, item) => acc + item.product.sellingPrice * item.quantity, 0));
            setCharges((total/100) * 2);
        } else {
            setCharges(0);;
            setTotal(0)
        }
    }, [cart])

    // TODO: Handle Checkout 

  return (
    <div className='p-10 flex flex-col lg:flex-row justify-center gap-10 lg: gap:20'>
        <div className='flex-auto'>
            <h3 className='text-2xl font-bold'>Cart</h3>
            <hr className='my-4'/>
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
            <h3 className='text-2xl font-bold' >Order Summary</h3>
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
                <button className={`bg-primary w-full p-2 rounded-lg my-2 ${cart.length === 0 ? "opacity-60 cursor-not-allowed " : ""}`} disabled={cart.length === 0}> Checkout </button>
            </div>
        </div>
    </div>
  )
}

export default CartPage