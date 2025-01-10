import { useFormContext } from "react-hook-form";
import {
  forwardRef,
  KeyboardEvent,
  RefObject,
  useContext,
  useRef,
} from "react";
import { StageContext } from "./UploadProductForm";
import Input from "./Input";
import Link from "next/link";
import { getProductByBarcode } from "@/lib/mongo/products";
import { Product } from "@/model/products";

const BarcodeInputs = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const { trigger, getFieldState, getValues, setError } =
    useFormContext<Product>();
  const { stage, setStage } = useContext(StageContext);

  const confirmBarcode = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" || e.key === "Enter") {
      await trigger(["barcode"]);
      const barcode = getValues("barcode").toString();
      const alreadyCreated = await getProductByBarcode(barcode);
      if (alreadyCreated) {
        dialog.current?.showModal();
        setError("barcode", {
          type: "value",
          message: "Este producto ya fue creado",
        });
        return;
      }
      setStage(1);
    }
  };

  return (
    <>
      <Input
        name="barcode"
        label="Código de barras"
        type="number"
        disabled={stage > 0}
        showAt={0}
        autoFocus
        onKeyDownCapture={confirmBarcode}
      />
      <AlreadyCreatedDialog ref={dialog} barcode={getValues("barcode")} />
    </>
  );
};

const AlreadyCreatedDialog = forwardRef<HTMLDialogElement, { barcode: string }>(
  ({ barcode = 0 }, ref) => {
    return (
      <dialog ref={ref}>
        <div className="flex flex-col items-center gap-2 rounded-md p-3 text-center">
          <span>{barcode}</span>
          <p className="my-3 text-xl font-semibold">
            Este producto ya fue creado
          </p>
          <p className="text-blue-500">¿Deseas editarlo?</p>
          <div className="flex flex-row-reverse gap-5 text-lg font-medium *:rounded-full *:px-3">
            <Link
              href={`/edit-product/${barcode}`}
              className="bg-blue-400 text-white"
            >
              Editar
            </Link>
            <button
              type="button"
              onClick={() =>
                (ref as RefObject<HTMLDialogElement>)?.current?.close()
              }
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    );
  },
);
export default BarcodeInputs;
