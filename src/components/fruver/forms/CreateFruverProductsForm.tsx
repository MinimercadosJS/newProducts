"use client";
import { FruverProduct, fruverProductSchema } from "@/model/fruverProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import "../../forms-styles.css";
import ImageInput from "./ImageInput";
import { useState } from "react";
import CategorySelector from "./CategoriesSelector";
const CreateFruverProductForm = () => {
  const form = useForm<FruverProduct>({
    resolver: zodResolver(fruverProductSchema),
  });
  const [nameSet, setNameSet] = useState(false);
  const { formState } = form;

  return (
    <form className="form">
      <FormProvider {...form}>
        <Input name="name" label="Nombre" onBlur={() => setNameSet(true)} />
        <ImageInput disabled={!nameSet} />
        <CategorySelector />
      </FormProvider>
      {formState.isValid && (
        <button
          type="submit"
          className="submit-button"
          disabled={!formState.isValid}
        >
          Crear producto
        </button>
      )}
    </form>
  );
};

export default CreateFruverProductForm;
