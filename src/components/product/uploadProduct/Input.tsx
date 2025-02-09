import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes, KeyboardEventHandler } from "react";
import { BarcodeProduct } from "@/model/products/barcode";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof BarcodeProduct;
  label: string;
}

const Input = ({
  name,
  label,
  type = "text",
  onChange,
  hidden,
  ...props
}: InputProps) => {
  const {
    register,
    formState: { errors },
    getFieldState,
    trigger,
  } = useFormContext<BarcodeProduct>();

  // Estado de validación del campo
  const fieldState = getFieldState(name);
  const isValid = fieldState.isDirty && !fieldState.invalid;

  // Manejo del evento Enter
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
  };

  // Validar al salir del input
  const handleBlur = () => {
    trigger(name);
  };

  // No renderizar si está oculto
  if (hidden) return null;

  return (
    <div className="input-group pb-4 relative flex flex-col h-min">
      <label htmlFor={name} className="text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...props}
        {...register(name, {
          onBlur: handleBlur,
          onChange, 
        })}
        onKeyDown={handleKeyDown}
        className={clsx(
          "input",
          errors[name] && "input-invalid",
          isValid && "input-valid"
        )}
        autoComplete="off"
      />
      {errors[name] && (
        <span className="absolute bottom-0 text-xs font-semibold text-red-500">
          {errors[name]?.message?.toString() || "Error en el campo"}
        </span>
      )}
    </div>
  );
};

export default Input;
