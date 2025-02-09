"use client";
import { camelCaseToTitleCase } from "@/utils/functions";
import { Controller, useFormContext } from "react-hook-form";
import { categories, subcategories } from "@/utils/consts";
import { useState } from "react";
import TagsInput from "./TagsInput";
import { BarcodeProduct, Category } from "@/model/products/barcode";

const CategorySelector = () => {
  const [category, setCategory] = useState<Category>("otra");
  const { register, control } = useFormContext<BarcodeProduct
  >();

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
