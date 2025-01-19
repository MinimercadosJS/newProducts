"use client";
import { createContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../forms-styles.css";
import { Product, UploadProduct, uploadProductSchema } from "@/model/products";
import BarcodeInputs from "./BarcodeInputs";
import ImageInput from "./ImageInput";
import Input from "./Input";
import BrandInput from "./BrandInput";
import CategorySelector from "./CategorySelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadProduct } from "@/lib/mongo/products";

interface StageContextProps {
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>> | (() => void);
}
export const StageContext = createContext<StageContextProps>({
  stage: 0,
  setStage: () => {},
});

const UploadProductForm = () => {
  const [stage, setStage] = useState(0);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "failed"
  >("idle");

  const form = useForm<UploadProduct>({
    resolver: zodResolver(uploadProductSchema),
  });

  const { control, formState, getValues, reset, setFocus } = form;
  const handleUploadProduct = async () => {
    setFormStatus("submitting");
    const product = getValues();

    const body: Product = {
      ...product,
      searchString: `${product.name} ${product.measure} - ${product.brand}`.toLowerCase(),
      checked: false
    };

    const result = await uploadProduct(body);
    if (!result) return setFormStatus("failed");
    setFocus("barcode");
    setFormStatus("submitted");
    setStage(0);
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
          <form action={handleUploadProduct} id="uploadProductForm">
            <FormProvider {...form}>
              <StageContext.Provider value={{ stage, setStage }}>
                <BarcodeInputs />
                <ImageInput />
                <Input
                  id="name"
                  name="name"
                  label="Nombre"
                  showAt={0}
                  required
                />
                <BrandInput showAt={0} />
                {/* <Input id="description" name="description" label='Descripción' showAt={3} required /> */}
                <Input
                  id="measure"
                  name="measure"
                  label="Medida"
                  showAt={0}
                  required
                />
                <CategorySelector showAt={0} />
              </StageContext.Provider>
            </FormProvider>
            {formState.isValid && (
              <button type="submit" className="submit-button">
                {" "}
                Crear producto{" "}
              </button>
            )}
          </form>
          <button type="button" className="size-0 opacity-0 outline-none">
            void focus out of page
          </button>
        </>
      );
  }
};

export default UploadProductForm;

// "use client";
// import { createContext, useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import "../forms-styles.css";
// import { Product, UploadProduct, uploadProductSchema } from "@/model/products";
// import BarcodeInputs from "./BarcodeInputs";
// import ImageInput from "./ImageInput";
// import Input from "./Input";
// import BrandInput from "./BrandInput";
// import CategorySelector from "./CategorySelector";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { uploadProduct } from "@/lib/mongo/products";

// interface StageContextProps {
//   stage: number;
//   setStage: React.Dispatch<React.SetStateAction<number>> | (() => void);
// }
// export const StageContext = createContext<StageContextProps>({
//   stage: 0,
//   setStage: () => {},
// });

// const UploadProductForm = () => {
//   const [stage, setStage] = useState(0);
//   const [formStatus, setFormStatus] = useState<
//     "idle" | "submitting" | "submitted" | "failed"
//   >("idle");

//   const form = useForm<UploadProduct>({
//     resolver: zodResolver(uploadProductSchema),
//   });

//   const { control, formState, getValues, reset, setFocus } = form;
//   const handleUploadProduct = async () => {
//     setFormStatus("submitting");
//     const product = getValues();

//     const body: Product = {
//       ...product,
//       searchString:
//         `${product.name} ${product.measure} - ${product.brand}`.toLowerCase(),
//       checked: false,
//     };

//     const result = await uploadProduct(body);
//     if (!result) return setFormStatus("failed");
//     setFocus("barcode");
//     setFormStatus("submitted");
//     setStage(0);
//     reset();
//     alert("Producto creado con éxito!");
//     return;
//   };
//   switch (formStatus) {
//     case "submitting":
//       return <div>Cargando...</div>;
//     case "failed":
//       return (
//         <h1 className="text-center font-bold text-4xl">
//           Fallo al intentar crear el producto ... Por favor comunícate con tu
//           proveedor de software
//         </h1>
//       );
//     default:
//       return (
//         <>
//           <form action={handleUploadProduct} id="uploadProductForm">
//             <FormProvider {...form}>
//               <StageContext.Provider value={{ stage, setStage }}>
//                 <BarcodeInputs />
//                 <ImageInput />
//                 <Input id="name" name="name" label="Nombre" showAt={2} required/>
//                 <BrandInput showAt={3} />
//                 {/* <Input id="description" name="description" label='Descripción' showAt={3} required /> */}
//                 <Input id="measure" name="measure" label="Medida" showAt={4} required />
//                 <CategorySelector showAt={5} />
//               </StageContext.Provider>
//             </FormProvider>
//             {formState.isValid && (
//               <button type="submit" className="submit-button">
//                 Crear producto
//               </button>
//             )}
//           </form>
//           <button type="button" className="size-0 opacity-0 outline-none">
//             void focus out of page
//           </button>
//         </>
//       );
//   }
// };

// export default UploadProductForm;
