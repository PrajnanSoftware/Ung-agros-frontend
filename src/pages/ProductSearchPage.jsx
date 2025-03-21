import React, { useEffect, useState } from 'react';
import { Filter, ShoppingCart } from 'lucide-react';
import ProductCardComponent from '../components/ProductCardComponent';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slice/productSlice';

// const productsData = [
//   { id: 1, name: 'Product 1', image: '/product/1.png', price: 20, rating: 4.5, discount: 5, reviews: 13 },
//   { id: 2, name: 'Product 2', image: '/product/2.png', price: 30, rating: 4, discount: 99, reviews: 653 },
//   { id: 3, name: 'Product 3', image: '/product/3.png', price: 25, rating: 3.5, discount: 18, reviews: 23 },
//   { id: 4, name: 'Product 4', image: '/product/4.png', price: 18, rating: 4.2, discount: 10, reviews: 45 },
//   { id: 5, name: 'Product 5', image: '/product/5.png', price: 35, rating: 4.7, discount: 20, reviews: 67 },
//   { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
//   { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
//   { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
//   { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
//   { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
//   { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
//   { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
//   { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
//   { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
//   { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
//   { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
//   { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
//   { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
//   { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
//   { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
//   { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
//   { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
//   { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
//   { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
//   { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
//   { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
//   { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
//   { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
//   { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
//   { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
//   { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
//   { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
//   { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
//   { id: 6, name: 'Product 6', image: '/product/6.png', price: 22, rating: 3.8, discount: 15, reviews: 32 },
//   { id: 7, name: 'Product 7', image: '/product/7.png', price: 40, rating: 4.3, discount: 8, reviews: 90 },
//   { id: 8, name: 'Product 8', image: '/product/8.png', price: 19, rating: 3.9, discount: 7, reviews: 25 },
//   { id: 9, name: 'Product 9', image: '/product/9.png', price: 28, rating: 4.6, discount: 12, reviews: 38 },
//   { id: 10, name: 'Product 10', image: '/product/10.png', price: 24, rating: 3.7, discount: 18, reviews: 52 },
//   { id: 11, name: 'Product 11', image: '/product/11.png', price: 33, rating: 4.1, discount: 25, reviews: 120 },
//   { id: 12, name: 'Product 12', image: '/product/12.png', price: 29, rating: 4.4, discount: 17, reviews: 73 },
  
// ];

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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 ">
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
