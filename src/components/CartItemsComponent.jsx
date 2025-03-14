import React from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateItemToCart, deleteItemFromCart } from '../redux/slice/cartSlice';



const CartItemsComponent = ({productId, name, imgUrl, price, quantity, avlQty }) => {
    const dispatch = useDispatch();
    const { cartLoading, cartAddError, cartRemoveError } = useSelector((state) => state.cart);


    const handleQtyIncrease = () => {
        if (quantity < avlQty) {
            const qty = quantity + 1;
            dispatch(addOrUpdateItemToCart({productId, quantity: 1}))
        }
    }

    const handleQtyDescrease = () => {

        if (quantity > 1) {
            const qty = quantity - 1;
            dispatch(addOrUpdateItemToCart({productId, quantity: -1}))
        }
    }
    
    const handleRemoveItem = () => {
        dispatch(deleteItemFromCart({productId}))
    }

  return (
    <div className='relative flex gap-4 items-center border p-2 rounded-lg m-2 pr-8'>
        <div className='absolute top-1 right-1 hover:cursor-pointer hover:bg-red-600 rounded-full' onClick={handleRemoveItem}>
            <MdOutlineDeleteForever className='text-2xl text-dark' />
        </div>
        <img src={imgUrl ? imgUrl : '/no-image.jpg'} alt="itemname" width={100} height={150}/>
        <div className='flex flex-col ml-2 w-full justify-between h-full gap-4'>
            <div className=''>
                <p className='overflow-hidden lg:overflow-visible text-ellipsis'>{name}</p>
            </div>
            <div className='flex justify-between'>
                <div className='flex px-1 order-1 lg:order-none w-fit items-center'>
                    <button className={`px-2 py-1 bg-gray-200 hover:bg-gray-300 transition rounded-l  ${quantity <= 1 || cartLoading ? "opacity-50 cursor-not-allowed hover:bg-gray-200" : ""}`} onClick={handleQtyDescrease} disabled={quantity <= 1 || cartLoading}>-</button>
                    <p className='px-2'>{quantity}</p>
                    <button className= {`px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 transition rounded-r  ${quantity >= avlQty || cartLoading  ? "opacity-50 cursor-not-allowed hover:bg-blue-500" : ""}`} onClick={handleQtyIncrease} disabled={quantity>=avlQty || cartLoading}>+</button>
                </div>
                {/* { cartAddError && <p className='order-1'>{cartAddError.error.message}</p>} */}
                <div className='order-1 lg:order-none text-right'>
                    <p>${quantity * price}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItemsComponent