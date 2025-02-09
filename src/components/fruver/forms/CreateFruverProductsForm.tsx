"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import "../../forms-styles.css";
import ImageInput from "./ImageInput";
import { useState } from "react";
import CategorySelector from "./CategoriesSelector";
import { DevTool } from "@hookform/devtools";
import { toKebabCase } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { FruverProduct, fruverProductSchema } from "@/model/products/fruver";
import { uploadFruverProduct } from "@/lib/mongo/products/fruver";

const CreateFruverProductForm = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "failed"
  >("idle");

  const router = useRouter();

  const form = useForm<FruverProduct>({
    resolver: zodResolver(fruverProductSchema),
  });
  const [nameSet, setNameSet] = useState(false);
  const { formState, handleSubmit, getValues, register, setValue, reset } = form;

  const handleSubmitProduct = async () => {
    setFormStatus("submitting");
    const updatedProduct = getValues();
    const result = await uploadFruverProduct(updatedProduct);
    if (!result) return setFormStatus("failed");
    setFormStatus("submitted");
    reset(); 
    alert("Producto creado con éxito!");
    return;
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleSubmitProduct)}>
      <FormProvider {...form}>
        <Input
          name="name"
          label="Nombre"
          onBlur={() => setNameSet(true)}
          onChange={(e) => setValue("id", toKebabCase(e.currentTarget.value))}
        />
        <input {...register("id")} hidden />
        <ImageInput disabled={!nameSet} />
        <CategorySelector />
      </FormProvider>
      {formState.isValid && (
        <button
          type="submit"
          disabled={!formState.isValid}
          className="submit-button"
        >
          {formStatus === "submitting" ? "Cargando..." : "Crear Producto"}
        </button>
      )}
      <DevTool {...form} />
    </form>
  );
};

export default CreateFruverProductForm;
