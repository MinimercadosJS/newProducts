"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import BrandInput from "./BrandInput";
import CategorySelector from "./CategorySelector";
import ImageInput from "./ImageInput";
import "../../forms-styles.css";
// import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { Product, productSchema } from "@/model/products";
import { editProduct, nextProductToCheck } from "@/lib/mongo/products";
import { useRouter } from "next/navigation";

const EditProductForm = ({ product }: { product: Product }) => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "failed"
  >("idle");
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { ...product },
  });
  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = form;
  const router = useRouter();

  const handleEditProduct = async () => {
    const next = await nextProductToCheck(product.barcode);

    setFormStatus("submitting");
    const updatedProduct = getValues();
    const result = await editProduct(updatedProduct);
    if (!result) return setFormStatus("failed");
    setFormStatus("submitted");
  
    router.back()
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleEditProduct)}>
      <FormProvider {...form}>
        <Input name="name" label="Nombre" />
        <BrandInput />
        <ImageInput />
        <Input name="measure" label="Medida" />
        <Input name="description" label="Descripción" defaultValue=" " />
        <CategorySelector />
        {/* <DevTool {...form} /> */}
        <button type="submit" disabled={!isValid} className="submit-button">
          {formStatus === "submitting" ? "Cargando..." : "Actualizar Producto"}
        </button>
      </FormProvider>
    </form>
  );
};

export default EditProductForm;
