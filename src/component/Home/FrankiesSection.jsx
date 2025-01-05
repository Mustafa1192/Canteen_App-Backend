import React from "react";
import ProductCard from "../ProductCard";

const FrankiesSection = () => {
    const frankies = [
      {
        id: 1,
        title: "Paneer Frankie",
        image: "https://via.placeholder.com/150",
        description: "Stuffed paneer rolls.",
        price: 4.5,
      },
      {
        id: 2,
        title: "Chicken Frankie",
        image: "https://via.placeholder.com/150",
        description: "Tasty chicken-filled rolls.",
        price: 5.0,
      },
      {
        id: 2,
        title: "Chicken Frankie",
        image: "https://via.placeholder.com/150",
        description: "Tasty chicken-filled rolls.",
        price: 5.0,
      },
      {
        id: 2,
        title: "Chicken Frankie",
        image: "https://via.placeholder.com/150",
        description: "Tasty chicken-filled rolls.",
        price: 5.0,
      },
      {
        id: 2,
        title: "Chicken Frankie",
        image: "https://via.placeholder.com/150",
        description: "Tasty chicken-filled rolls.",
        price: 5.0,
      }
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Frankies</h2>
        <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {frankies.map((product) => (
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
  export default FrankiesSection;
  