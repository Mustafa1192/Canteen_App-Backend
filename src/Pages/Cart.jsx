import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []);

  const handleQuantityChange = (index, type) => {
    const updatedItems = [...cartItems];

    if (type === "increase") {
      updatedItems[index].quantity += 1;
    } else if (type === "decrease") {
      if (updatedItems[index].quantity > 1) {
        updatedItems[index].quantity -= 1;
      } else {
        // If quantity becomes 0, remove the item
        updatedItems.splice(index, 1);
      }
    }

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems)); // Update localStorage
  };

  const handlePayment = () => {
    // Store order data
    const orderData = {
      items: cartItems,
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      ),
      date: new Date(),
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Redirect to order confirmation page
    navigate("/orders");
  };

  const handleAddItems = () => {
    // Redirect user to the home or product listing page
    navigate("/home");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="container mx-auto bg-[#F0F0F5] p-4 h-screen flex flex-col md:px-80">
      {/* Title */}
      <h1 className="text-lg font-bold mb-4">
        {cartItems.length === 0 ? "Add Items Here" : "Review your Order"}
      </h1>

      {/* Cart Items */}
      <div className="flex-grow overflow-y-auto">
        {cartItems.length === 0 ? (
          <h1 className="pt-36 text-center font-semibold">
            Your cart is getting lonely. <br />
            <span className="font-thin py-2">Fill up with all things good!</span>
          </h1>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-lg bg-white mb-4"
            >
              {/* Delivery Info */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium text-gray-600">
                  Delivery in <span className="font-bold">10 Mins</span>
                  <span className="ml-2 text-green-500">⚡ Superfast</span>
                </span>
                <span className="text-sm text-gray-600">
                  {item.quantity} item
                </span>
              </div>

              {/* Product Details */}
              <div className="flex items-center justify-between mt-4 border-b pb-2">
                <div className="flex items-center">
                  <img
                    src={item.image} // Ensure you have the image URL
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <span className="text-sm text-gray-600">1 Piece</span>
                  </div>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(index, "decrease")}
                    className="border p-1 px-2 rounded text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="mx-2 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(index, "increase")}
                    className="border p-1 px-2 rounded text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex justify-between items-center mt-4">
                <div className="line-through text-gray-400 text-sm">
                  {item.oldPrice}
                </div>
                <div className="text-lg font-bold text-green-600">
                  ₹{item.price}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Price */}
      {cartItems.length > 0 && (
        <div className="mt-4 text-right font-semibold">
          {/* <p className="text-2xl px-4">Total Price: ₹{totalPrice}</p> */}
        </div>
      )}

      {/* Note */}
      {cartItems.length > 0 && (
        <p className="text-sm text-red-600 text-center mt-2 mb-2">
          *Orders cannot be cancelled or refunded after payment.*
        </p>
      )}

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg">
        <h1 className="p-2 text-lg font-bold">
          {cartItems.length === 0 ? "Add Some Delicious Items!" : "Almost There"}
        </h1>
        <button
          onClick={cartItems.length === 0 ? handleAddItems : handlePayment}
          className="bg-green-500 text-white w-full py-3 rounded-lg shadow-lg hover:bg-green-600 transition relative"
        >
          {cartItems.length === 0 ? (
            "Add Items"
          ) : (
            <>
              Pay ₹{totalPrice}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
