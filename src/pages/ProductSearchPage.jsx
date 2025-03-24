import React, { useEffect, useState } from 'react';
import { Filter, ShoppingCart } from 'lucide-react';
import ProductCardComponent from '../components/ProductCardComponent';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slice/productSlice';


const ProductSearchPage = () => {
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get('query');
  const { category="" } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const { products, totalPages, currentPage, totalProducts, productsLoading, productError} = useSelector((state) => state.product);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 690);

  useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth < 690);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    console.log(category);
    dispatch(getProducts({name:query, category, page:1, limit:10}));
  }, [dispatch, query, category]);

  const handleClickNavigation = (product) => {
    console.log(product)
    navigate(`/product/${product._id}/${product.category._id}`)
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(getProducts({name:query, category, page:currentPage+1, limit:10}));
    }
  };

  if (productsLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center" >
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (

      <div className='h-[calc(100vh-80px)] flex justify-center items-center' >
        <p className=' text-2xl font-semibold'>No results found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-2">

      <div className='my-2'>
        <p>Showing {products.length} of {totalProducts} products</p>
      </div>


      {/* Product Cards */}
      <div className='flex justify-center'>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 ">
        { products.map((product, index) => (
          <div key={index} onClick={() => {handleClickNavigation(product)}} className='cursor-pointer'>
            <ProductCardComponent product={product} small={isSmallScreen} />
          </div>
        ))}
      </div> 
      </div> 

      {/* Load More Button */}
      {currentPage < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            disabled={productsLoading}

          >
            {productsLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {productError && <p className="text-red-500 mt-2">{productError}</p>}
    </div>
  );
};

export default ProductSearchPage;
