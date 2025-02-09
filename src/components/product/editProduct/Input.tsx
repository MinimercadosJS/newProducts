import clsx from "clsx";
import { BarcodeProduct } from "@/model/products/barcode";
import { InputHTMLAttributes, KeyboardEventHandler } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof BarcodeProduct;
    label: string;
}

const Input = ({ name, label, hidden, type = "text", ...props }: InputProps) => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<BarcodeProduct>();
    const { isDirty, invalid } = getFieldState(name);
    const valid = isDirty && !invalid;
    
    
    const handleClickEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key != 'Enter') return;
        e.currentTarget.blur();
    }
    return (
        <>
            {
                !hidden &&
                <div className="input-group pb-4 relative flex flex-col h-min">
                    <label htmlFor={name} className='text-sm font-semibold text-gray-600'>{label}</label>
                    <input
                        id={name}
                        type={type}
                        {...props}
                        {...register(name, { onBlur: () => trigger(name) })}
                        onKeyDown={handleClickEnter}
                        // ...
                        className={clsx(
                            "input",
                            { "input-invalid": errors[name] },
                            { "input-valid": valid }
                        )}
                        autoComplete="off"
                    />
                    {errors[name] && <span className="absolute bottom-0 text-xs font-semibold text-red-500">{errors[name]?.message}</span>}
                </div>
            }
        </>
    )
}

export default Input