import React from "react";
import ProductCard from "../ProductCard";

const SouthIndianSection = () => {
  const southIndianFoods = [
    {
      id: 1,
      title: "Masala Dosa",
      image: "https://via.placeholder.com/150",
      description: "Crispy dosa filled with spicy potatoes.",
      price: 4.0,
    },
    {
      id: 2,
      title: "Idli Sambar",
      image: "https://via.placeholder.com/150",
      description: "Steamed idlis served with sambar potatoes.",
      price: 3.5,
    },
    {
      id: 3,
      title: "Vada",
      image: "https://via.placeholder.com/150",
      description: "Deep-fried lentil potatoes potatoes donuts.",
      price: 3.0,
    },
    {
      id: 2,
      title: "Idli Sambar",
      image: "https://via.placeholder.com/150",
      description: "Steamed idlis served potatoes with sambar.",
      price: 3.5,
    },
    {
      id: 3,
      title: "Vada",
      image: "https://via.placeholder.com/150",
      description: "Deep-fried lentil potatoes potatoes donuts.",
      price: 3.0,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">South Indian Food</h2>
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {southIndianFoods.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-64 rounded-lg border shadow-md bg-white"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default SouthIndianSection;
