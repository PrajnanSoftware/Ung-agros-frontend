import React, { useState, useEffect } from "react";
import { Star, StarHalf, Star as StarOutline, ChevronDown } from "lucide-react"; 
import ProductCardComponent from "../components/ProductCardComponent";
import StarRating from "../components/StarRatingComponent";
import ProductReview from "../components/ProductReviewComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slice/productSlice";

// Sample product data (main product)
// const product = {
//   id: 1,
//   name: "Grass Cutter",
//   model: "GC XYZ123",
//   originCountry: "USA",
//   manufactureDate: "2025-01-01",
//   originalPrice: 50,
//   discount: 10,
//   details: `This is a wonderful product that has a lot of great features. 
//             It’s designed to meet the needs of a wide variety of customers. 
//             With its sleek design and powerful features, it is one of the top-rated products in its category. 
//             Perfect for professionals and enthusiasts alike.`,
//   rating: 3.9,
//   images: ["1.png", "2.png", "3.png", "4.png", "5.png"],
// };


const recommended_product = [
  {
    id: 2,
    name: "Product A",
    price: 40,
    discount: 5,
    rating: 4.2,
    image: "/product/1.png",
    reviews:23
  },
  {
    id: 3,
    name: "Product B",
    price: 60,
    discount: 15,
    rating: 4.7,
    image: "/product/3.png",
    reviews:455
  },
  {
    id: 4,
    name: "Product C",
    price: 30,
    discount: 0,
    rating: 4.0,
    image: "/product/2.png",
    reviews:453
  },
];


const calculateDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};



export default function ProductDetailsPage() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { products = [] } = useSelector((state) => state.product);
  

  const [current_image, setCurrentImage] = useState(0);
  const [show_more, setShowMore] = useState(false);
  const [show_details, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [ product, setProduct] = useState({});

  // Auto-switch images every 30 seconds
  const product = products.find((p) => p._id === id);
  useEffect(() => {
    dispatch(getProducts());
    console.log(product)
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % product.images.length);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return <h2 className="text-center text-red-500">Product not found</h2>;
  }

  return (
    <div >
      <div className="p-5 flex flex-col lg:flex-row lg:justify-between lg:items-start">
        <div className="w-full lg:w-[50vw] mb-4 lg:mb-0 lg:mr-8 lg:ml-auto relative">
          <div className="relative w-full h-[60vh] lg:h-[50vh] overflow-hidden rounded-lg">
            <img
              src={`/product/${current_image}.png`}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          <div className="flex justify-center mt-4">
            {product.image.map((_, index) => (
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
          <h2 className="text-[20px] font-bold mb-2">{product.name}</h2>
          <div className="flex items-center mb-2">
            <span className="text-gray-500 line-through text-[18px] mr-2">
              ${product.price}
            </span>
            <span className="text-[18px] font-semibold text-green-600">
              ${product.sellingPrice}
            </span>
            <span className="ml-2 text-xs font-medium text-red-500">
              ({(((product.price - product.sellingPrice)/ product.price) * 100).toFixed(2)}% OFF)
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
              ? product.description
              : `${product.description.substring(0, 150)}...`}{" "}
            <button
              onClick={() => setShowMore(!show_more)}
              className="text-blue-500 ml-2 underline"
            >
              {show_more ? "Show Less" : "Show More"}
            </button>
          </div>
          { product.quantity > 0 ? (
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
              {[...Array(product.quantity).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button className="bg-green-500 text-white text-xs py-2 px-4 rounded hover:bg-green-600">
              Add to Cart
            </button>
            {/* <button className="bg-blue-500 text-white text-xs py-2 px-4 rounded hover:bg-blue-600">
              Buy Now
            </button> */}
          </div>

          <div className="flex flex-col  mt-6">
            <button
              onClick={() => setShowDetails(!show_details)}
              className="flex  text-blue-500 text-[16px] underline"
            >
              More Product Details <ChevronDown className="ml-2 text-[16px]" />
            </button>

            {show_details && (
              <div className="mt-4 text-[14px] text-gray-600">
                <p>
                  <strong>Model:</strong> {product.model}
                </p>
                <p>
                  <strong>Origin Country:</strong> {product.originCountry}
                </p>
                <p>
                  <strong>Manufacture Date:</strong> {product.manufactureDate}
                </p>
                <p>
                  <strong>Assembly Date:</strong> {product.manufactureDate}
                </p>
                
              </div>
            )}
          </div>
        </div>
      </div>

     
        {/* <ProductReview/> */}

      {/* Products You Might Like Section */}
      <div className="mt-4 p-5 " style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="text-lg font-semibold mb-4">Products You Might Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center lg:justify-items-start">
          {recommended_product.map((recProduct) => {
            const discountedPrice = calculateDiscountedPrice(
              recProduct.originalPrice,
              recProduct.discount
            );
            return (
              <ProductCardComponent product={recProduct}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
