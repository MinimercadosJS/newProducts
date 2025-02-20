"use client";
import "./edit-product-styles.css";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import BrandInput from "./BrandInput";
import CategorySelector from "./CategorySelector";
import ImageInput from "./ImageInput";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BarcodeProduct, barcodeProductSchema } from "@/model/products/barcode";
import {  editBarcodeProduct, nextProductToCheck } from "@/lib/mongo/products/barcode";

const EditProductForm =  ({ product }: { product: BarcodeProduct  }) => {

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "failed"
  >("idle");
  const form = useForm({
    resolver: zodResolver(barcodeProductSchema),
    defaultValues: { ...product },
  });
  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = form;
  const router = useRouter();

  const searchParams = useSearchParams()
  const user = searchParams.get('user')

  const handleEditProduct = async () => {
    const next = await nextProductToCheck(product.barcode);

    setFormStatus("submitting");
    const updatedProduct = getValues();
    const result = await editBarcodeProduct({...updatedProduct, checkedBy: user || "none"});
    if (!result) return setFormStatus("failed");
    setFormStatus("submitted");

    router.back();
  };

  return (
    <form id="uploadProductForm" onSubmit={handleSubmit(handleEditProduct)}>
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
