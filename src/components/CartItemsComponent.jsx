import React, { useState } from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCart, updateItemCart } from '../redux/slice/cartSlice';
import { MdCurrencyRupee } from 'react-icons/md';


const CartItemsComponent = ({productId, name, imgUrl, price, quantity, avlQty }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const handleQtyIncrease = async () => {
        setLoading(true);
        if (quantity < avlQty) {
            const qty = quantity + 1;
            await dispatch(updateItemCart({productId, quantity: 1})).unwrap();
        }
        setLoading(false);
    }

    const handleQtyDescrease = async () => {
        setLoading(true);
        if (quantity > 1) {
            const qty = quantity - 1;
            await dispatch(updateItemCart({productId, quantity: -1})).unwrap();
        }
        setLoading(false);
    }
    
    const handleRemoveItem = () => {
        dispatch(deleteItemFromCart({productId}))
    }

  return (
    <div className='relative flex gap-4 items-center border p-2 rounded-lg m-2 pr-8'>
        <div className='absolute top-1 right-1 hover:cursor-pointer hover:bg-red-600 rounded-full' onClick={handleRemoveItem}>
            <MdOutlineDeleteForever className='text-2xl text-dark' />
        </div>
        <div className='w-32 h-32 overflow-hidden'>
            <img src={imgUrl ? imgUrl : '/no-image.jpg'} alt={name} className='object-contain'/>
        </div>
        <div className='flex flex-col ml-2 w-full justify-between h-full gap-4'>
            <div className=''>
                <p className='overflow-hidden lg:overflow-visible text-ellipsis'>{name}</p>
            </div>
            <div className='flex justify-between'>
                {
                    loading ? (<div className="flex justify-center items-center">
                        <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (<div className='flex px-1 order-1 lg:order-none w-fit items-center'>{}
                    <button className={`px-2 py-1 bg-gray-200 hover:bg-gray-300 transition rounded-l  ${quantity <= 1 || loading ? "opacity-50 cursor-not-allowed hover:bg-gray-200" : ""}`} onClick={handleQtyDescrease} disabled={quantity <= 1 || loading}>-</button>
                    <p className='px-2'>{quantity}</p>
                    <button className= {`px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 transition rounded-r  ${quantity >= avlQty || loading  ? "opacity-50 cursor-not-allowed hover:bg-blue-500" : ""}`} onClick={handleQtyIncrease} disabled={quantity>=avlQty || loading}>+</button>
                </div>)
                }

                {/* { cartAddError && <p className='order-1'>{cartAddError.error.message}</p>} */}
                <div className='order-1 lg:order-none text-right'>
                    <p className='flex items-center'><MdCurrencyRupee />{quantity * price}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItemsComponent