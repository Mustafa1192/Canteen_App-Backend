import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ title, image, description, price }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  // Load cart data from localStorage
  const loadCartData = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  };

  // Save cart data to localStorage
  const saveCartData = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Handle add to cart action
  const handleAddToCart = () => {
    const cartData = loadCartData();
    const existingItem = cartData.find((item) => item.title === title);

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add new item to the cart
      cartData.push({ title, image, description, price, quantity });
    }

    // Save updated cart data
    saveCartData(cartData);
    setAddedToCart(true); // Mark as added
    // navigate("/cart"); // Navigate to the cart page
  };

  // Handle quantity change
  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === "increase") return prevQuantity + 1;
      if (type === "decrease" && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white relative">
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-md"/>
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-green-600 font-bold">${price}</span>
      </div>

      <button
        onClick={() => {
          handleAddToCart(); // Your existing function to add to cart
          setAddedToCart(true); // Set the added state to true
        }}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        {addedToCart ? "Added" : "Add to Cart"}
      </button>


      {/* View Cart Pop-Up */}
      {addedToCart && (
        <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
