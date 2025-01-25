import { useFormContext } from "react-hook-form";
import {
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
} from "react";
import clsx from "clsx";
import { FruverProduct } from "@/model/fruverProducts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof FruverProduct;
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
  } = useFormContext<FruverProduct>();

  // Estado de validación del campo
  const fieldState = getFieldState(name);
  const isValid = fieldState.isDirty && !fieldState.invalid;

  // Manejo del evento Enter
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
  };

  // Validar al salir del input
  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    trigger(name);
    props.onBlur && props.onBlur(e);
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
