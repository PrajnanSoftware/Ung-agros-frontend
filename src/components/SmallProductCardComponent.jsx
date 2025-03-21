import React from 'react'

const SmallProductCardComponent = ({ product }) => {
  return (
    <div className='group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden min-w-[160px] max-w-[320px] min-h-[250px] max-h-[480px] flex flex-col border-2 border-accent'>
        {/* Product image */}
        <div className='relative min-h-[100px] max-h-[240px] overflow-hidden'>
            <img src={product.image} alt={product.name} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' />
        </div>

        {/* Product details */}
        <div className='p-2 md:p-4 flex flex-col'>
            <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2 md:mb-3">
            <span className="text-xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
            </span>
            {product.discount && (
                <span className="text-sm text-gray-500 line-through">
                ${(product.price / (1 - product.discount/100)).toFixed(2)}
                </span>
            )}
            </div>

            {/* Rating */}
            {product.rating && (
            <div className="flex items-center gap-1 md:mb-4">
                <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                ))}
                </div>
            </div>
            )}
        </div>

        {/* Add to Cart Button */}
        <button className="mx-2 mb-2 md:mx-4  bg-primary bg-opacity-90 text-white py-1 md:py-2 px-2 md:px-4 rounded-md hover:bg-opacity-100 transition-colors flex items-center justify-center gap-1 md:gap-2">
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
    </div>
  )
}

export default SmallProductCardComponent