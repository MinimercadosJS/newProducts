"use client";
import { camelCaseToTitleCase } from "@/utils/functions";
import { Controller, useFormContext } from "react-hook-form";
import { fruverCategories } from "@/utils/consts";
import { useState } from "react";
import TagsInput from "./TagsInput";
import { FruverCategory, FruverProduct } from "@/model/products/fruver";

const CategorySelector = () => {
  const [category, setCategory] = useState<FruverCategory>("otros");
  const { register, control } = useFormContext<FruverProduct>();
  
  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select
          {...register("category", {
            onChange: (event) =>
              setCategory(event.target.value as FruverCategory),
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
      <Controller
        control={control}
        name="tags"
        render={({ field }) => <TagsInput category={category} {...field} />}
      />
    </>
  );
};

export default CategorySelector;
