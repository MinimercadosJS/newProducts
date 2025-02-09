import { useFormContext } from "react-hook-form";
import {
  forwardRef,
  KeyboardEvent,
  RefObject,
  useRef,
  useState,
} from "react";
import Input from "./Input";
import Link from "next/link";
import { BarcodeProduct } from "@/model/products/barcode";
import { getProductByBarcode } from "@/lib/mongo/products/barcode";

const BarcodeInputs = () => {
  const [disabled, setDisabled] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null);
  const { trigger, getValues, setError } =
    useFormContext<BarcodeProduct>();

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
      setDisabled(true);
    }
  };

  return (
    <>
      <Input
        name="barcode"
        label="Código de barras"
        type="number"
        autoFocus
        onKeyDownCapture={confirmBarcode}
        disabled={disabled}
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
