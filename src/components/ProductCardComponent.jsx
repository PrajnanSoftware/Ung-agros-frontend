import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateItemToCart } from '../redux/slice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function onViewDetail(id){
 window.location.href= "/product-detail?id="+id;
}

function onBuyNow(id){
  window.location.href= "/purchase-confirmation?product_id="+id;
 }



const ProductCardComponent = ({ product ,showViewDetailBtn = false , showBuyNowBtn = false, viewDetailBgColor, buyNowBgColor, small = false }) => {
  
  const { user } = useSelector((state) => state.user);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleAddToCartButton = async (e) => {
    try {
      e.stopPropagation();
      if (user) {
        await dispath(addOrUpdateItemToCart({productId: product._id, quantity: 1})).unwrap();
        toast.success(`${product.name} added to cart.`);
      } else {
        navigate('/login');
        toast.info("Please login to contine.");
      }
    } catch (error) {
      toast.error("Something went wrong, try again");
    }
  }
  return (
    <div className={`group relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white 
                  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto`}>
        {/* Product image */}
        <div className='overflow-hidden rounded-lg'>
            <img src={product?.image[0]} alt={product.name} className='w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105' />
        </div>

        {/* Product details */}
        <div className='mt-4'>
            <h3 className="text-md sm:text-lg md:text-xl font-semibold text-gray-800">
                {product.name}
            </h3>
            <span className='text-xs sm:text-sm md:text-base text-gray-600'>{product.description.substring(0, 200)+"..."}</span>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
            <span className="text-sm sm:text-lg font-bold text-gray-900">
              ${product.sellingPrice}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ${product.price}
            </span>
            <span className="text-xs sm:text-sm text-green-600 font-medium">
              ({(((product.price - product.sellingPrice)/ product.price) * 100).toFixed(2)}% OFF)
            </span>
            </div>
        </div>
 
        {/* Add to Cart Button */}
        {(product.quantity > 0) ? (
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300 text-sm sm:text-base" onClick={handleAddToCartButton}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </button>
        ) : (
          <button className="mt-4 w-full bg-red-400 text-white py-2 rounded-md cursor-not-allowed text-sm sm:text-base" disabled={true}>
          Out of Stcok
        </button>
        )
        }
        
    </div>
  )
}

export default ProductCardComponent;