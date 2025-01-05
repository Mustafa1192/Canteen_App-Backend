import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons from react-icons
import { AiOutlineArrowLeft } from "react-icons/ai";
import BottomNav from "../component/BottomNav";

const RecentTransactions = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null); // State to manage expanded order

  useEffect(() => {
    // Fetch past orders saved in localStorage
    const storedPastOrders = JSON.parse(localStorage.getItem("pastOrders")) || [];

    // Filter only the orders with successful payments (paymentStatus: 'Success')
    const successfulOrders = storedPastOrders.filter(order => order.paymentStatus === "Success");
    setPastOrders(successfulOrders);
  }, []);

  const getTotalPrice = (order) => {
    // Calculate total price for each order
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const toggleExpand = (orderIndex) => {
    // Toggle the expanded order state
    if (expandedOrder === orderIndex) {
      setExpandedOrder(null); // Close the expanded order if clicked again
    } else {
      setExpandedOrder(orderIndex); // Open the clicked order
    }
  };

  return (
    <div className={`container lg:px-60 mx-auto ${pastOrders.length === 0 ? "h-screen" : "h-auto"} flex flex-col md:px-80`}>
      {/* Title */}
      <div className="bg-white rounded-lg p-2 shadow-md w-full">
        <a href="home"><button className="flex items-center text-[#333] py-3">
          <AiOutlineArrowLeft className="mr-2 text-xl" />
          Past Orders
        </button></a>
      </div>      

      {/* Orders List */}
      <div className="flex-grow mb-16 p-4">
        {pastOrders.length > 0 ? (
          <div className="border rounded-lg p-4 shadow-lg bg-white">
            {/* Loop through all past orders */}
            <div className="space-y-6">
              {pastOrders.map((order, index) => (
                <div key={index} className="border-b pb-4">
                  {/* Display order date */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Ordered on <span className="font-bold">{new Date(order.date).toLocaleDateString()}</span>
                    </span>
                    <span className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                  </div>

                  {/* Order Product */}
                  <div className="flex items-center justify-between mt-4 cursor-pointer"  onClick={() => toggleExpand(index)}>
                    <div className="flex items-center">
                      {/* Show default meal image and text if more than 1 item */}
                      {order.items.length > 1 ? (
                        <div className="flex items-center">
                          <img
                            src="https://i.pinimg.com/736x/b7/ff/8e/b7ff8ec3f66de511af8c9be5723aa157.jpg" // Add a default meal image here
                            alt="Meal"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <span className="ml-4 text-gray-600">Meal</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <img
                            src={order.items[0].image} // Assuming the first item image for order
                            alt="Product"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <h2 className="text-lg font-semibold">{order.items[0].title}</h2>
                            <p className="text-sm text-gray-600">&#x20B9;{getTotalPrice(order).toFixed(2)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Section with icon */}
                    <div className="flex items-center space-x-2">
                      {order.paymentStatus === "Success" ? (
                        <FaCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <FaTimesCircle className="text-red-500 text-xl" />
                      )}
                      <span className={`text-sm ${order.paymentStatus === "Success" ? "text-green-500" : "text-red-500"}`}>
                        {order.paymentStatus === "Success" ? "Paid" : "Payment Failed"}
                      </span>
                    </div>
                  </div>

                  {/* Expand order details when clicked */}
                  {expandedOrder === index && (
                    <div className="mt-4 space-y-4 bg-gray-100 rounded-xl px-6 py-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={item.image} // Item image
                              alt={item.title}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <h2 className="font-semibold">{item.title}</h2>
                              <p className="text-sm text-gray-600">Price: &#x20B9;{(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No past orders available.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default RecentTransactions;
