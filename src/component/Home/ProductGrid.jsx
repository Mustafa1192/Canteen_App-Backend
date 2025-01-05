import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/product";

const ProductGrid = () => {
  const [addedToCartState, setAddedToCartState] = useState({});
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

  // Handle Add to Cart action
  const handleAddToCart = (product) => {
    const currentCart = loadCartData();
    const existingItem = currentCart.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if the product already exists in the cart
      existingItem.quantity += 1;
    } else {
      // Add the new product with a default quantity of 1
      currentCart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    saveCartData(currentCart);

    // Update the "addedToCart" state for the specific product
    setAddedToCartState((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-5">Top Selling Items</h2>
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] max-w-[400px] border rounded-lg p-4 shadow-lg bg-white relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.rating}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-green-600 font-bold">${product.price}</span>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {addedToCartState[product.id] ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* View Cart Popup */}
      {Object.values(addedToCartState).some((state) => state) && (
        <div className="bg-white fixed bottom-0 left-0 w-full py-4 z-50 shadow-md">
        <div className="flex items-center justify-between max-w-screen-md mx-auto px-4">
          <h1 className="text-gray-800 font-semibold text-lg">Item Added to Cart</h1>
          <button
            onClick={() => navigate("/cart")}
            className="bg-[#1BA672] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#148a58] transition duration-300"
          >
            Go to Cart
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default ProductGrid;
