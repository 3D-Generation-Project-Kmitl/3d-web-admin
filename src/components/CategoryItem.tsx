import React from "react";
import { CategoryProduct } from "../types/categoryProduct";

function CategoryItem({ category }: { category: CategoryProduct }) {
  return (
    <div className="flex flex-row items-center justify-between mt-3 p-5 bg-gray-50 rounded-md shadow-sm">
      <div className="flex flex-row  gap-2 items-center">
        <div className="bg-gray-100 rounded-full p-3 w-12 h-12">
          <img alt="category" src={category.picture} />
        </div>
        <p>{category.name}</p>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold">{category._count.Product}</h1>
        <p className="text-xs text-gray-600">จำนวนสินค้า</p>
      </div>
    </div>
  );
}

export default CategoryItem;
