import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and retrieving query params

// Mock API to fetch order and product details
const fetchOrderDetails = async (orderId, orderType) => {
  // This is a placeholder. Replace with your actual API request to fetch order details
  return {
    orderId,
    orderType,
    orderDate: '2025-02-14',
    expectedDelivery: '2025-02-20',
    invoiceNumber: '20234/4325/3144', 
    receipt: '242342/235/324',
    products: orderType === 'cart'
      ? [
          { productId: 1, name: 'Item 1', imageUrl: '/product/1.png', quantity: 2, price: 10.99 },
          { productId: 2, name: 'Item 2', imageUrl: '/product/2.png', quantity: 1, price: 15.99 },
          { productId: 3, name: 'Item 3', imageUrl: '/product/3.png', quantity: 3, price: 20.99 }
        ]
      : [{ productId: 1, name: 'Single Product', imageUrl: '/product/1.png', quantity: 1, price: 29.99 }]
  };
};

const OrderDetailsPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract query params from the URL
  const searchParams = new URLSearchParams(location.search);
  const { order } = location.state || {};
  const orderId = searchParams.get('o_i'); // order_id

  // Fetch order details when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const details = await fetchOrderDetails(orderId, orderType);
  //     setOrderDetails(details);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [orderId, orderType]);


  if (!order) {
    return <p>No order details available.</p>;
  }

  // Handle product click and redirect to product_details page
  const handleProductClick = (productId, category) => {
    navigate(`/product/${productId}/${category}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Order Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>

        
          {/* Order Details Section */}
          <p className="text-gray-600 mb-2">
            <strong>Order ID:</strong> {order._id}
          </p>
            {/* Order Date */}
            <p className="text-gray-600 mb-2">
            <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>

          {/* <p className="text-gray-600 mb-2">
            <strong>Expected Delivery:</strong> {orderDetails.expectedDelivery || 'Not available'}
          </p> */}
          <p className="text-gray-600 mb-2">
            <strong>Order Status:</strong> <span className='text-blue-500' >{order.orderStatus}</span>
          </p>

          {/* Invoice Number - Shows in red if not generated */}
          <p className={`text-gray-600 mb-2 `}>
            <strong>Invoice Number:</strong>{' '}
            {order.billDetails.invoiceNumber}
          </p>
{/* 
          Receipt - Show in red if not generated
          <p className={`text-gray-600 mb-4 ${!orderDetails.receipt ? 'text-red-600' : ''}`}>
            <strong>Receipt:</strong> {orderDetails.receipt ? orderDetails.receipt : 'Receipt not generated'}
          </p> */}

          {/* Download Buttons */}
          <div className="flex space-x-4">
            {/* Download Invoice Button - Hide if not generated */}
            {order.billDetails.invoiceNumber && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Download Invoice
              </button>
            )}

            {/* Download Receipt Button - Hide if not generated
            {orderDetails.receipt && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Download Receipt
              </button>
            )} */}
          </div>
          
        </div>

        {/* Right Column - Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {'Product Details'}
          </h3>

          {/* Product List for Cart Orders */}

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex  items-center bg-gray-100 p-4 rounded-lg cursor-pointer"
                  onClick={() => handleProductClick(item.product._id, item.product.category)}
                >
                  {/* Ensure image shows up */}
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg" // Added more styling to ensure the image shows up correctly
                  />
                  <div className="ml-4">
                    <p className="font-medium">{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price per unit: ${item.price}</p>
                    <p>Price: ${item.totalProductPrice}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
