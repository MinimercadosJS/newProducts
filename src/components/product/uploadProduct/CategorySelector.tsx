"use client";
import { camelCaseToTitleCase } from "@/globalFunctions";
import { Controller, useFormContext } from "react-hook-form";
import { Category, Product } from "@/model/products";
import { categories, subcategories } from "@/globalConsts";
import { useState } from "react";
import TagsInput from "./TagsInput";

const CategorySelector = () => {
  const [category, setCategory] = useState<Category>("otra");
  const { register, control } = useFormContext<Product>();


  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select
          {...register("category", {
            onChange: (event) => setCategory(event.target.value as Category),
          })}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {camelCaseToTitleCase(category)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="text-sm font-semibold text-gray-600">
          Sub categoría
        </span>
        <select
          {...register("subcategory", { required: true })}
          disabled={!category}
        >
          <option value=""></option>
          {category &&
            subcategories[category]?.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {camelCaseToTitleCase(subcategory)}
              </option>
            ))}
        </select>
      </label>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => <TagsInput category={category} {...field} />}
      />
    </>
  );
};

export default CategorySelector;
