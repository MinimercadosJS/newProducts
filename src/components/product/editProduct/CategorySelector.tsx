"use client";
import { useFormContext } from "react-hook-form";
import { categories, Product } from "@/model/products";
import { camelCaseToTitleCase } from "@/globalFunctions";

const CategorySelector = () => {
  const { register, getValues } = useFormContext<Product>();

  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select required {...register("category")}>
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {camelCaseToTitleCase(category)}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default CategorySelector;
