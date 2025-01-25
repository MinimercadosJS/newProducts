"use client";
import { camelCaseToTitleCase } from "@/globalFunctions";
import { Controller, useFormContext } from "react-hook-form";
import {  fruverCategories, fruverSubcategories, subcategories } from "@/globalConsts";
import { useState } from "react";
import { FruverCategory, FruverProduct } from "@/model/fruverProducts";
import TagsInput from "./TagsInput";

const CategorySelector = () => {
  const [category, setCategory] = useState<FruverCategory>("otros");
  const { register, control } = useFormContext<FruverProduct>();

  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select
          {...register("category", {
            onChange: (event) => setCategory(event.target.value as FruverCategory),
          })}
        >
          <option value=""></option>
          {fruverCategories.map((category) => (
            <option key={category} value={category}>
              {camelCaseToTitleCase(category)}
            </option>
          ))}
        </select>
      </label>
      {
        fruverSubcategories[category] &&  
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
            fruverSubcategories[category]?.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {camelCaseToTitleCase(subcategory)}
              </option>
            ))}
        </select>
      </label>
          }
      <Controller
        control={control}
        name="tags"
        render={({ field }) => <TagsInput {...field} />}
      />
    </>
  );
};

export default CategorySelector;
