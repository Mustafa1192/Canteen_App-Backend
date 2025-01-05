import React from "react";
import ProductCard from "../ProductCard";

const SouthIndianSection = () => {
  const beverages = [
    {
      id: 1,
      title: "Lemon Juice",
      image: "https://via.placeholder.com/150",
      description: "Fresh lemon juice with mint.",
      price: 2.5,
    },
    {
      id: 2,
      title: "Cold Coffee",
      image: "https://via.placeholder.com/150",
      description: "Chilled coffee with cream.",
      price: 3.0,
    },
    {
      id: 3,
      title: "Iced Tea",
      image: "https://via.placeholder.com/150",
      description: "Refreshing iced tea.",
      price: 2.0,
    },
    {
      id: 4,
      title: "Cold Coffee",
      image: "https://via.placeholder.com/150",
      description: "Chilled coffee with cream.",
      price: 3.0,
    },
    {
      id: 5,
      title: "Iced Tea",
      image: "https://via.placeholder.com/150",
      description: "Refreshing iced tea.",
      price: 2.0,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Beverages</h2>
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {beverages.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-64 rounded-lg border shadow-md  bg-white"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SouthIndianSection;
