import React, { useState } from 'react'
import SliderComponent from '../components/SliderComponent'
import ProductCardComponent from '../components/ProductCardComponent'
import SmallProductCardComponent from '../components/SmallProductCardComponent'

const products = [
  {
    id: 1,
    name: 'Summer Collection',
    description: 'New arrivals for summer season',
    price: 49.99,
    image: '/banner1.jpg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 234,
    discount: 15
  },
  {
    id: 2,
    name: 'Winter Special',
    description: 'Stay warm in style',
    price: 89.99,
    image: '/banner2.jpg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 234,
    discount: 15
  },
]
const categories = [
  'COIR PRODUCTS',
  'GARDEN TOOLS',
  'HDPE GROW BAGS',
  'PLASTIC POTS',
  'SEEDLING TRAYS',
  'SOIL MIX AND FERTILIZERS',
];

const LandingHomePage = () => {

  const [updates, setUpdates] = useState([
    "🌾 New Organic Seeds Available!",
    "🚜 20% Off on Agricultural Tools!",
    "🌿 Fresh Home Garden Plants in Stock!",
    "📢 New Pheromone Traps Collection!",
    "🌍 Eco-Friendly Farming Products Now Available!"
  ]);

  return (
    <div>
        {/* Slider */}
        <div>
          <SliderComponent products={products} />
        </div>
        <div className='h-10 bg-secondary items-center overflow-hidden'>
          <div className="h-full w-full whitespace-nowrap animate-marquee flex space-x-10 m-auto">
            {updates.map((update, index) => (
              <span key={index} className="text-light font-semibold text-lg">
                {update}
              </span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className='px-4 py-10'>
          <h1 className='font-extrabold text-2xl  md:text-4xl text-center text-primary'>Where every seed holds the promise of a greener tomorrow. <br />🌱 Start growing your legacy today!</h1>
        </div>

        {/* Top Selling */}
        <div>
          <div className='mt-4 mb-8'>
            <h2 className='text-2xl font-bold w-fit m-auto py-4'>TOP SELLING PRODUCTS</h2>
          </div>
          <div className='p-6 flex gap-6 overflow-auto '>
            {[...products, ...products, ...products].map((product, index) => (
              <ProductCardComponent key={index} product={product} />
            ))}
          </div>
        </div>

        {/* Category */}
        <div className=''>
          <div className='mt-4 mb-8 '>
            <h2 className='text-2xl font-bold w-fit m-auto py-4'>CATEGORIES</h2>
          </div>

          <div className='flex gap-6 justify-start px-6 overflow-x-scroll scroll-smooth hide-scrollbar'>
            {[...categories, ...categories].map((category, index) => (
              <div key={index} className='flex flex-col items-center'>
                <div className='relative h-24 w-24 rounded-full border-4 border-accent overflow-hidden'>
                  <img src={products[1].image} alt={products[1].name} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' />
                </div>
                <h6 className="mt-4 text-sm text-center font-semibold text-gray-800">
                  {category}
                </h6>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className='items-center'>
          <div className='mt-4 mb-8'>
            <h2 className='text-2xl font-bold w-fit m-auto py-4'>OUR PRODUCTS</h2>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-2 lg:p-6 justify-items-center'>
            {[...products, ...products, ...products].map((product, index) => (
              <SmallProductCardComponent key={index} product={product} />
            ))}
          </div>
        </div>

    </div>
  )
}

export default LandingHomePage