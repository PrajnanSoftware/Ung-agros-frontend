  import React, { useEffect, useState } from 'react'
  import SliderComponent from '../components/SliderComponent'
  import ProductCardComponent from '../components/ProductCardComponent'
  import SmallProductCardComponent from '../components/SmallProductCardComponent'
  import { useDispatch, useSelector } from 'react-redux'
  import { useNavigate } from 'react-router-dom'
  import { getNewProducts, getProducts, getTopSellingProducts } from '../redux/slice/productSlice'
  // TODO: InProgress

  // const categories = [
  //   'COIR PRODUCTS',
  //   'GARDEN TOOLS',
  //   'HDPE GROW BAGS',
  //   'PLASTIC POTS',
  //   'SEEDLING TRAYS',
  //   'SOIL MIX AND FERTILIZERS',
  // ];

  const LandingHomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { topSellingProducts = [], newProducts = [], topSellingProductLoading, newProductsLoading } = useSelector((state) => state.product);
    const { category = [] } = useSelector((state) => state.category );

    const [updates, setUpdates] = useState([
      "🌾 New Organic Seeds Available!",
      "🚜 20% Off on Agricultural Tools!",
      "🌿 Fresh Home Garden Plants in Stock!",
      "📢 New Pheromone Traps Collection!",
      "🌍 Eco-Friendly Farming Products Now Available!"
    ]);

    useEffect(() => {
      dispatch(getTopSellingProducts());
      dispatch(getNewProducts());
    }, [])

    const handleClickNavigation = (product) => {
      console.log(product)
      navigate(`product/${product._id}`)
    }

    return (
      <div>
          {/* Slider */}
          <div>
            <SliderComponent />
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
            <div className='p-6 flex gap-6 overflow-x-auto'>
              { topSellingProductLoading ? (
                    <p className="text-center text-gray-600 w-full">Loading...</p>
                ) : (topSellingProducts.length > 0 ? ( topSellingProducts.map((product, index) => (
                <div key={index} onClick={() => {handleClickNavigation(product)}} className='cursor-pointer'>
                  <ProductCardComponent product={product} />
                </div>
              ))) : (<p className="text-center text-gray-600 w-full">No products available.</p>))}
            </div>
          </div>

          {/* Category */}
          <div className='w-full'>
            <div className='mt-4 mb-8 '>
              <h2 className='text-2xl font-bold w-fit m-auto py-4'>CATEGORIES</h2>
            </div>

            <div className='flex gap-6 justify-start px-6 overflow-x-auto scroll-smooth snap-x snap-mandatory m-auto'>
              { category.length > 0 ? (category.map((cat, index) => (
                <div key={index} className='flex flex-col items-center snap-start'>
                  <div className='relative h-24 w-24 rounded-full border-4 border-accent overflow-hidden'>
                    {/* <img src={p[1].image} alt={p[1].name} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' /> */}
                  </div>
                  <h6 className="mt-4 text-sm text-center font-semibold text-gray-800">
                    {cat.name}
                  </h6>
                </div>
              ))): (
                <p className="text-center text-gray-600">No categories available.</p>
              )}
            </div>
          </div>

          {/* Products */}
          <div className='items-center'>
            <div className='mt-4 mb-8'>
              <h2 className='text-2xl font-bold w-fit m-auto py-4'>NEW PRODUCTS</h2>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 md:gap-6 gap-1 p-2 lg:p-6 justify-items-center'>
              { newProductsLoading ? (
                <p className="text-center text-gray-600 w-full">Loading...</p>
              ) : (
              newProducts.map((product, index) => (
                <div key={index} onClick={() => {handleClickNavigation(product)}} className='cursor-pointer'>
                  <ProductCardComponent product={product} small={true} />
                </div>
                // <SmallProductCardComponent key={index} product={product} />
              )))}
            </div>
          </div>

      </div>
    )
  }

  export default LandingHomePage