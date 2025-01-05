import React, { useEffect, useState } from "react";

const RecentTransactions = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Fetch order data saved in localStorage
    const storedOrderData = JSON.parse(localStorage.getItem("orderData")) || null;
    setOrderData(storedOrderData);
  }, []);

  return (
    <div className="bg-pink-50 p-6 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        {orderData ? (
          <div className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/736x/86/22/34/86223498ce2b18ed55919a8838ca156b.jpg" // Replace with real image
              alt="Product"
              className="w-16 h-16 rounded"/>
            <div className="ml-4 flex-grow">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-semibold text-gray-800">
                    {item.title} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No recent transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
