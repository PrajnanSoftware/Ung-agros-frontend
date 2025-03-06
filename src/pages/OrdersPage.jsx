import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon

const ordersData = [
  {
    id: 1,
    name: 'Product 1',
    image: '/product/1.png',
    orderedDate: '2025-02-14',
    expectedDelivery: '2025-02-20',
    status: 'In Progress',
    price: 29.99,
    quantity: 2,
    order_type: 'regular', // Regular order
  },
  {
    id: 2,
    name: 'Cart Order',
    image: null, // No product image for cart orders
    orderedDate: '2025-02-10',
    expectedDelivery: '2025-02-18',
    status: 'Shipped',
    price: 49.99,
    itemCount: 3, // For cart orders, use item count instead of quantity
    order_type: 'cart', // Cart order
    order_items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'], // List of items in cart
  },
  {
    id: 3,
    name: 'Product 3',
    image: '/product/3.png',
    orderedDate: '2025-02-11',
    expectedDelivery: null, // Delivery process not started yet
    status: 'Order Placed',
    price: 19.99,
    quantity: 3,
    order_type: 'regular', // Regular order
  },
];

const OrdersPage = () => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  // Handle click event to navigate to the order details page with the order ID and order type as query parameters
  const handleOrderClick = (orderId, orderType) => {
    navigate(`/order-details?o_i=${orderId}&order_type=${orderType}`); // Pass order_type in the query params
  };

  const MAX_ITEMS_DISPLAY = 2; // Maximum number of items to display before "Show More"

  // Function to display cart order items with "Show More"
  const renderOrderItems = (orderItems) => {
    const [showMore, setShowMore] = useState(false);

    if (orderItems.length <= MAX_ITEMS_DISPLAY || showMore) {
      return (
        <>
          {orderItems.join(', ')}
          {orderItems.length > MAX_ITEMS_DISPLAY && (
            <button
              className="text-blue-500 text-sm ml-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from triggering the parent onClick
                setShowMore(false);
              }}
            >
              Show Less
            </button>
          )}
        </>
      );
    }

    return (
      <>
        {orderItems.slice(0, MAX_ITEMS_DISPLAY).join(', ')}
        <button
          className="text-blue-500 text-sm ml-1"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from triggering the parent onClick
            setShowMore(true);
          }}
        >
          Show More
        </button>
      </>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* My Orders Label */}
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-col cursor-pointer"
            onClick={() => handleOrderClick(order.id, order.order_type)} // Pass order_type to navigation
          >
            {/* Mobile View - Small Image on Left */}
            <div className="flex md:flex-col items-center md:items-start">
              {/* Image - Use cart icon for cart orders, product image for regular orders */}
              <div className="flex-shrink-0 w-20 h-20 md:w-full md:h-40 overflow-hidden rounded-lg mb-4 md:mb-6">
                {order.order_type === 'cart' ? (
                  <FaShoppingCart className="w-full h-full text-gray-600" /> // Show cart icon
                ) : (
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Order Details */}
              <div className="ml-4 flex flex-col space-y-2">
                {/* Heading for cart order with Show More functionality */}
                <h3 className="font-semibold text-lg">
                  {order.order_type === 'cart' ? (
                    renderOrderItems(order.order_items) // Show order items for cart orders
                  ) : (
                    order.name // Show order name for regular orders
                  )}
                </h3>
                <p className="text-sm text-gray-600">Ordered: {order.orderedDate}</p>

                {/* Quantity or Item Count based on order type */}
                {order.order_type === 'cart' ? (
                  <p className="text-sm text-gray-600">Items: {order.itemCount}</p>
                ) : (
                  <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                )}

                {/* Expected Delivery Date (if exists) */}
                {order.expectedDelivery && (
                  <p className="text-sm text-gray-600">
                    Expected Delivery: {order.expectedDelivery}
                  </p>
                )}

                {/* Order Status */}
                <p
                  className={`text-sm font-semibold ${
                    order.expectedDelivery
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  {order.expectedDelivery ? order.status : 'Order Placed'}
                </p>

                {/* Total Cost */}
                <p className="text-sm text-gray-800 font-semibold">
                  Total Cost: ${(order.price * (order.quantity || order.itemCount)).toFixed(2)}
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
