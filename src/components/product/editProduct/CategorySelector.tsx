"use client";
import { Controller, useFormContext } from "react-hook-form";
import {  Category, Product } from "@/model/products";
import { camelCaseToTitleCase } from "@/globalFunctions";
import { useEffect, useState } from "react";
import TagsInput from "../uploadProduct/TagsInput";
import { categories } from "@/globalConsts";

const CategorySelector = () => {
  const { register, getValues, control } = useFormContext<Product>();
  const [category, setCategory] = useState<Category>("otra");
  useEffect(() => {
    setCategory(getValues("category"))
    
  }, [])
  
  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select
          required
          {...register("category", {
            onChange: (event) => setCategory(event.target.value as Category)
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
      {/* <label>
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
      </label> */}
      <Controller
        control={control}
        name="tags"
        render={({ field }) => <TagsInput category={category} {...field} />}
      />
    </>
  );
};

export default CategorySelector;
