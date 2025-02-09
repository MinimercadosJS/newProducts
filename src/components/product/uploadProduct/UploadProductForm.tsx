"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../../forms-styles.css";
import BarcodeInputs from "./BarcodeInputs";
import ImageInput from "./ImageInput";
import Input from "./Input";
import BrandInput from "./BrandInput";
import CategorySelector from "./CategorySelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarcodeProduct, UploadBarcodeProduct, uploadBarcodeProductSchema } from "@/model/products/barcode";
import { uploadBarcodeProduct } from "@/lib/mongo/products/barcode";

const UploadProductForm = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "failed"
  >("idle");

  const form = useForm<UploadBarcodeProduct>({
    resolver: zodResolver(uploadBarcodeProductSchema),
    defaultValues: {tags: []}
  });
  const { control, handleSubmit, formState, getValues, reset, setFocus , watch} = form;
  const category = watch("category")

  const handleUploadProduct = async () => {
    setFormStatus("submitting");
    const product = getValues();

    const body: BarcodeProduct = {
      ...product,
      tags: product.tags ||  [],
      searchString: `${product.name} ${product.measure} - ${product.brand}`.toLowerCase(),
      checked: false
    };

    const result = await uploadBarcodeProduct(body);
    if (!result) return setFormStatus("failed");
    setFocus("barcode");
    setFormStatus("submitted");
    reset();
    alert("Producto creado con éxito!");
    return;
  };

  switch (formStatus) {
    case "submitting":
      return <div>Cargando...</div>;
    case "failed":
      return (
        <h1 className="text-center font-bold text-4xl">
          Fallo al intentar crear el producto ... Por favor comunícate con tu
          proveedor de software
        </h1>
      );
    default:
      return (
        <>
          <form onSubmit={handleUploadProduct } className="form">
            <FormProvider {...form}>
                <BarcodeInputs />
                <ImageInput />
                <Input
                  id="name"
                  name="name"
                  label="Nombre"
                />
                <BrandInput  />
                {/* <Input id="description" name="description" label='Descripción' showAt={3} required /> */}
                <Input
                  id="measure"
                  name="measure"
                  label="Medida"
                />
                <CategorySelector  />
            </FormProvider>
            {formState.isValid && (
              <button type="submit" className="submit-button" disabled={!formState.isValid}>
                Crear producto
              </button>
            )}
          </form>

          {/* <DevTool control={control} /> */}
        </>
      );
  }
};

export default UploadProductForm;

