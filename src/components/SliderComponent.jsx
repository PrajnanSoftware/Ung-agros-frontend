import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';

const SliderComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const products = [
    '/banner1.jpg', '/banner2.jpg'
  ];

  const nextSlide = (isAuto = false) => {
    setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );

    if(!isAuto) {
        resetInterval();
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => nextSlide(true), 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
  }, []);

  return (
    <div className='relative w-full h-64 lg:h-96 overflow-hidden'>
        {/* Slides */}
        <div className='relative h-full'>
            {products.map((product, index) => (
                <div 
                    key={product.id}
                    className={`absolute inset-0 transition-opacity duration-300 ${ index == currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div
                        className='w-full h-full bg-cover bg-center'
                        style={{backgroundImage: `url(${product})`}}
                    >
                        {/* Display info inside the image */}
                        {/* <div className='flex items-center justify-center h-full bg-black bg-opacity-30'>
                            <div className='text-center text-white'>
                                <h2 className='text-2xl md:text-4xl font-bold mb-4'>{product.name}</h2>
                                <p className='text-lg md:text-xl mb-6'>{product.description}</p>
                                <p className='text-xl md:text-2xl font-bold mb-8'>${product.price}</p>
                                <button className='bg-white text-black px-6 py-3 rounded-full hover:bg-opacity-80 transition'>Shop Now</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>

        {/* Navigation arrows */}
        <button
            onClick={prevSlide}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition'
        >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button
            onClick={() => nextSlide()}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
      </button>

        {/* Indicators */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
            {products.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? 'bg-white' : 'bg-gray-400'
                    }`}
                />
            ))}
        </div>
    </div>
  );
};

export default SliderComponent