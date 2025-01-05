import React from 'react';

const categories = [
  { id: 1, name: "Vegetables & Fruits" },
  { id: 2, name: "Milk & Dairy" },
  { id: 3, name: "Breakfast" },
  { id: 4, name: "Biscuits" },
  { id: 5, name: "Bread" },
  { id: 6, name: "Chicken" },
];

const CategoryList = () => {
  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Featured Categories</h2>
      <div className="flex overflow-x-auto space-x-4 p-2scrollbar-thin scrollbar-thumb-gray-300 md:justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 text-center p-3 border rounded-lg min-w-[120px] max-w-[150px] bg-gray-100"
          >
            <h3 className="font-medium text-sm">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
