  import React, { useEffect, useState } from 'react'
  import SliderComponent from '../components/SliderComponent'
  import ProductCardComponent from '../components/ProductCardComponent'
  import SmallProductCardComponent from '../components/SmallProductCardComponent'
  import { useDispatch, useSelector } from 'react-redux'
  import { useNavigate } from 'react-router-dom'
  import { getNewProducts, getProducts, getTopSellingProducts } from '../redux/slice/productSlice';
  import AOS from 'aos';

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
    const { category = [], categoryLoading } = useSelector((state) => state.category );

    const [updates, setUpdates] = useState([
      "🌾 New Organic Seeds Available!",
      "🚜 20% Off on Agricultural Tools!",
      "🌿 Fresh Home Garden Plants in Stock!",
      "📢 New Pheromone Traps Collection!",
      "🌍 Eco-Friendly Farming Products Now Available!"
    ]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 468);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 468);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
      dispatch(getTopSellingProducts());
      dispatch(getNewProducts());
    }, [])

    const handleClickNavigation = (product) => {
      console.log(product)
      navigate(`product/${product._id}/${product.category}`)
    }

    const handleCategoryClick = (category) => {
      // console.log(category);
      navigate(`/search-result/${category._id}`);
    }

    return (
      <div data-aos='fade-up'>
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
              <h2 className='text-2xl font-bold w-fit m-auto py-4 text-secondary'>TOP SELLING PRODUCTS</h2>
            </div>
            <div className='p-6 flex gap-6 overflow-x-auto'>
              { topSellingProductLoading ? (
                <div className="w-full flex justify-center items-center">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                ) : (topSellingProducts.length > 0 ? ( topSellingProducts.map((product, index) => (
                <div key={index} onClick={() => {handleClickNavigation(product)}} className='cursor-pointer'>
                  <ProductCardComponent product={product} />
                </div>
              ))) : (<p className="text-center text-gray-600 w-full">No products available.</p>))}
            </div>
          </div>

          {/* Category */}
          <div className='text-center'>
            <div className='mt-4 mb-4 '>
              <h2 className=' text-2xl font-bold w-fit m-auto py-4 text-secondary'>CATEGORIES</h2>
            </div>

            
              { categoryLoading ? (
                <div className="w-full flex justify-center items-center">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                ) : (category.length > 0 ? (
                  <div className='w-full'>
                    <div className='flex justify-start overflow-scroll no-scrollbar gap-4 text-nowrap px-10 m-auto'>
                      {category.map((cat, index) => (
                      <div key={index} className='flex flex-col items-center w-fit' onClick={() => { handleCategoryClick(cat)}}>
                        <div className='w-24 h-24 rounded-full border-4 border-accent text-center'>
                          {cat.image ? (<img src={cat?.image} alt={cat.name} className='w-full h-full rounded-full object-cover transition-transform duration-300 hover:scale-110' />) : (<img src={'/no-image.jpg'} alt={cat.name} className='w-full h-full rounded-full object-cover transition-transform duration-300 hover:scale-110' />)}
                        </div>
                        <h6 className="mt-4 text-sm text-center font-semibold text-gray-800">
                          {cat.name}
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
            ): (
                <p className="text-center text-gray-600">No categories available.</p>
              ))}

          </div>

          {/* Products */}
          <div className='items-center mb-4'>
            <div className='mt-4 mb-4'>
              <h2 className='text-2xl font-bold w-fit m-auto py-4 text-secondary'>NEW PRODUCTS</h2>
            </div>
              { newProductsLoading ? (
                <div className="w-full flex justify-center items-center my-4">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className='flex justify-center'>
                  <div className='grid grid-cols-2 md:grid-cols-3 md:gap-6 px-4 md:px-6 lg:px-8 w-full'>
                    {newProducts.map((product, index) => (
                      <div key={index} onClick={() => {handleClickNavigation(product)}} className='cursor-pointer'>
                        <ProductCardComponent product={product} small={isSmallScreen} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

          </div>

      </div>
    )
  }

  export default LandingHomePage