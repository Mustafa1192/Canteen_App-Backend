import React from "react";
import ProductCard from "../ProductCard";

const GeneralFoodSection = () => {
  const generalFoods = [
    {
      id: 1,
      title: "Samosa",
      image: "https://via.placeholder.com/150",
      description: "Crispy and spicy samosas.",
      price: 1.5,
    },
    {
      id: 2,
      title: "Cutlet",
      image: "https://via.placeholder.com/150",
      description: "Deep-fried veggie cutlet.",
      price: 2.0,
    },
    {
      id: 3,
      title: "Cold Drink",
      image: "https://via.placeholder.com/150",
      description: "Refreshing soda drink.",
      price: 1.0,
    },
    {
      id: 4,
      title: "Burger",
      image: "https://via.placeholder.com/150",
      description: "Delicious cheeseburger.",
      price: 3.5,
    },
    {
      id: 5,
      title: "Cold Drink",
      image: "https://via.placeholder.com/150",
      description: "Refreshing soda drink.",
      price: 1.0,
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">General Food</h2>
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {generalFoods.map((product) => (
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

export default GeneralFoodSection;
