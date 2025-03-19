import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import { axiosInstance } from '../utils/axiosInstance';
import { MdCurrencyRupee } from 'react-icons/md';
import AOS from 'aos';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
      const getMyOrders = async () => {
        try {
          setLoading(true)
          const response = await axiosInstance.get('/order');
          console.log(response.data);
          if (response.data.status === "success") {
            setOrders(response.data?.orders)
          }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading( false );
      }};
      getMyOrders();
      
    
  }, []); 

  // Handle click event to navigate to the order details page with the order ID and order type as query parameters
  const handleOrderClick = (order) => {
    navigate(`/order-details?o_i=${order._id}`, { state: { order }}); // Pass order_type in the query params
  };
// console.log("HiHello",loading)
  if (loading) {
      return (
          <div className="p-10" >
            {/* <h2 className="text-xl font-semibold mb-4">My Orders</h2> */}
            <div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
              <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>)
  }

  if (orders.length === 0) {
    return (
      <div className='p-10'>
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className='w-full min-h-[calc(100vh-200px)] flex items-center justify-center'>
          <p className='text-xl'>No Orders data</p>
        </div>
      </div>
    )
  }

  // const MAX_ITEMS_DISPLAY = 2; // Maximum number of items to display before "Show More"

  // Function to display cart order items with "Show More"
  // const renderOrderItems = (orderItems) => {
  //   console.log("Order Items: ", orderItems)
  //   const [showMore, setShowMore] = useState(false);
    
  //   if (orderItems.length <= MAX_ITEMS_DISPLAY || showMore) {
  //     return (
  //       <>
  //         {orderItems?.map(item => item.product.name).join(', ')}
  //         {orderItems.length > MAX_ITEMS_DISPLAY && (
  //           <button
  //             className="text-blue-500 text-sm ml-1"
  //             onClick={(e) => {
  //               e.stopPropagation(); // Prevent click event from triggering the parent onClick
  //               setShowMore(false);
  //             }}
  //           >
  //             Show Less
  //           </button>
  //         )}
  //       </>
  //     );
  //   }

  //   return (
  //     <>
  //       {orderItems.slice(0, MAX_ITEMS_DISPLAY).join(', ')}
  //       <button
  //         className="text-blue-500 text-sm ml-1"
  //         onClick={(e) => {
  //           e.stopPropagation(); // Prevent click event from triggering the parent onClick
  //           setShowMore(true);
  //         }}
  //       >
  //         Show More
  //       </button>
  //     </>
  //   );
  // };

  return (
    <div className="container mx-auto p-4" >
      {/* My Orders Label */}
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {/* Orders List */}
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 border cursor-pointer"
            onClick={() => handleOrderClick(order)} // Pass order_type to navigation
          >
            {/* Mobile View - Small Image on Left */}
            <div className="flex items-center gap-4">
              {/* Image - Use cart icon for cart orders, product image for regular orders */}
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg mb-4 md:mb-6">
                {/* TODO: Order.items.length > 1 */}
                {order?.items?.length > 1 ? (
                  <FaShoppingCart className="w-full h-full text-gray-600" /> // Show cart icon
                ) : (
                  <img
                    src={order?.items?.product?.image[0]}
                    alt={order?.items?.product?.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Order Details */}
              <div className="ml-4 flex flex-col space-y-2">
                {/* Heading for cart order with Show More functionality */}
                <h3 className="font-semibold text-lg">
                  {order.items.length > 1 ? (
                    // renderOrderItems(order.items) // Show order items for cart orders
                    <div className="truncate w-60 overflow-hidden whitespace-nowrap" title={order.items.map(item => item.product.name).join(", ")}>
                      {order.items.map(item => item.product.name).join(", ")}
                    </div>
                  ) : (
                    order?.items[0]?.product?.name // Show order name for regular orders
                  )}
                </h3>
                <p className="text-sm text-gray-600 text-wrap">Ordered: {new Date(order.createdAt).toLocaleString()}</p>

                {/* Quantity or Item Count based on order type */}
                {order.items.length > 1 ? (
                  <p className="text-sm text-gray-600">Items: {order.items.length}</p>
                ) : (
                  <p className="text-sm text-gray-600">Quantity: {order.items[0].quantity}</p>
                )}

                {/* Expected Delivery Date (if exists)
                {order.expectedDelivery && (
                  <p className="text-sm text-gray-600">
                    Expected Delivery: {order.expectedDelivery}
                  </p>
                )} */}

                {/* Order Status */}
                <p
                  className={`text-sm font-semibold text-blue-600`}
                >
                  {order.orderStatus}
                </p>

                {/* Total Cost */}
                <p className="text-sm text-gray-800 font-semibold flex items-center">
                  Total Cost: <MdCurrencyRupee />{order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
