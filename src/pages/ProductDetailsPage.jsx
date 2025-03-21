import React, { useState, useEffect } from "react";
import { Star, StarHalf, Star as StarOutline, ChevronDown } from "lucide-react"; 
import ProductCardComponent from "../components/ProductCardComponent";
import StarRating from "../components/StarRatingComponent";
import ProductReview from "../components/ProductReviewComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById, findProductSuggestion, getProducts } from "../redux/slice/productSlice";
import { addOrUpdateItemToCart } from "../redux/slice/cartSlice";
import { MdCurrencyRupee } from "react-icons/md";


const calculateDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};




export default function ProductDetailsPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, category } = useParams();
  const { productDetail, productSuggestion, productSuggestionLoading, productSuggestionError, productDetailLoading, productDetailError } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  

  const [current_image, setCurrentImage] = useState(0);
  const [show_more, setShowMore] = useState(false);
  const [show_details, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [ product, setProduct] = useState({});

  // Auto-switch images every 30 seconds
  useEffect(() => {
    dispatch(findProductById(id));
    dispatch(findProductSuggestion(category))
    console.log(productDetail)
    const timer = setInterval(() => {
      console.log(productDetail)
      setCurrentImage((prevImage) => (prevImage + 1) % productDetail?.image?.length);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

    const handleAddToCartButton = (e) => {
      e.stopPropagation();
      if (user) {
        dispatch(addOrUpdateItemToCart({productId: productDetail._id, quantity: quantity}))
      } else {
        navigate('/login')
      }
    }

    if (productDetailLoading) 
      return <div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

    if (productDetailError) 
      return <div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <h2 className="text-center text-red-500">Something went wrong, Try again later.</h2>;
      </div>
    
    if (!productDetail) {
      return <div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center" >
        <h2 className="text-center text-red-500">Product not found</h2>;
      </div>
    }

  return (
    <div>
      <div className="p-5 flex flex-col lg:flex-row lg:justify-between lg:items-start">
        <div className="w-full lg:w-[50vw] mb-4 lg:mb-0 lg:mr-8 lg:ml-auto relative">
          <div className="relative w-full h-[60vh] lg:h-[50vh] overflow-hidden rounded-lg">
            <img
              src={productDetail.image[current_image]}
              alt={productDetail.name}
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>

          <div className="flex justify-center mt-4">
            {productDetail.image.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-4 h-4 rounded-full mx-1 focus:outline-none 
                  ${current_image === index ? "bg-green-500" : "bg-gray-300"}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[50%] lg:ml-8 lg:flex lg:flex-col lg:items-start">
          <h2 className="text-[20px] font-bold mb-2">{productDetail.name}</h2>
          <div className="flex items-center mb-2">
            
            <span className="text-lg font-semibold text-green-600 flex items-center">
              <MdCurrencyRupee /> {productDetail.sellingPrice}
            </span>
            <span className="text-gray-500 line-through text-sm mr-2 flex items-center ml-2">
              <MdCurrencyRupee /> {productDetail.price}
            </span>
            <span className="ml-2 text-xs font-medium text-red-500">
              ({(((productDetail.price - productDetail.sellingPrice)/ productDetail.price) * 100).toFixed(2)}% OFF)
            </span>

            <div className="ml-4 flex items-center">
              {/* <StarRating rating={product.rating}/> */}
              {/* <span className="ml-1 text-[16px] text-gray-500">
                ({product.rating})
              </span> */}
            </div>
          </div>

          <div className="text-[16px] text-gray-600 mb-4">
            {show_more
              ? productDetail.description
              : `${productDetail.description.substring(0, 200)}...`}{" "}
            <button
              onClick={() => setShowMore(!show_more)}
              className="text-blue-500 ml-2 underline"
            >
              {show_more ? "Show Less" : "Show More"}
            </button>
          </div>
          { productDetail.quantity > 0 ? (
            <div className="text-green-500 text-[18px] font-medium mb-2">In Stock</div>
          ) : (
            <div className="text-red-500 text-[18px] font-medium mb-2">Out of Stock</div>
          )}

          <div className="flex gap-2 items-center mb-4">
            <label htmlFor="quantity" className="text-[16px]">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="text-[16px] p-1 border border-gray-300 rounded"
            >
              {[...Array(productDetail.quantity).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button className="bg-green-500 text-white text-xs py-2 px-4 rounded hover:bg-green-600" onClick={handleAddToCartButton}>
              Add to Cart
            </button>
            {/* <button className="bg-blue-500 text-white text-xs py-2 px-4 rounded hover:bg-blue-600">
              Buy Now
            </button> */}
          </div>

          {/* <div className="flex flex-col  mt-6">
            <button
              onClick={() => setShowDetails(!show_details)}
              className="flex  text-blue-500 text-[16px] underline"
            >
              More Product Details <ChevronDown className="ml-2 text-[16px]" />
            </button>

            {show_details && (
              <div className="mt-4 text-[14px] text-gray-600">
                <p>
                  <strong>Model:</strong> {productDetail.model}
                </p>
                <p>
                  <strong>Origin Country:</strong> {productDetail.originCountry}
                </p>
                <p>
                  <strong>Manufacture Date:</strong> {productDetail.manufactureDate}
                </p>
                <p>
                  <strong>Assembly Date:</strong> {productDetail.manufactureDate}
                </p>
                
              </div>
            )}
          </div> */}
        </div>
      </div>

     
        {/* <ProductReview/> */}

      {/* Products You Might Like Section */}
      <div className="mt-4 p-5 " style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="text-lg font-semibold mb-4">Products You Might Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center lg:justify-items-start">
          {productSuggestion.map((recProduct, index) => {
            return (
              <ProductCardComponent key={index} product={recProduct}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
