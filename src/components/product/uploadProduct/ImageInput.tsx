import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { uploadImage } from "@/lib/cloudinary/actions";
import { CldImage } from "next-cloudinary";
import { LuLoader } from "react-icons/lu";
import { UploadProduct } from "@/model/products";

const ImageInput = () => {
  const { register, getValues, setValue } = useFormContext<UploadProduct>();
  const [imageId, setImageId] = useState<string>("");
  const [withoutImage, setWithoutImage] = useState(false)

  const [imageState, setImageState] = useState<
    "idle" | "loading" | "loaded" | "failed"
  >("idle");

  const inputRef = useRef<HTMLInputElement>(null);

  const UploadImage: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageState("loading");
    const formData = new FormData();
    formData.append("NewProductReportImage", file);

    const cloudinaryData: any = await uploadImage(
      formData,
      getValues("barcode").toString()
    );

    if (!cloudinaryData.public_id) return;
    setImageId(cloudinaryData.public_id);
    setValue("image", cloudinaryData.public_id);
    setImageState("loaded");
  };


const handleWithoutImage = () =>{
  if (!withoutImage) {
    setValue("image", "no-image")
    setImageId("no-image")
    setImageState("loaded")
  } else{
    setImageState("idle");
    setImageId("");
    setValue("image", "")
  }

  setWithoutImage(prev => !prev)
  
}
  return (
    <div className="image-input" onClick={() => inputRef.current?.click()}>
      {(() => {
        switch (imageState) {
          case "idle":
            return (
              <div className="text-5xl text-gray-500 text-center flex flex-col items-center gap-5">
                <IoIosAddCircleOutline />
                <span className="text-sm font-semibold">
                  Añadir imagen del producto
                </span>
                <input
                  type="file"
                  accept='".png, .jpg, .jpeg"'
                  capture="environment"
                  id="barcode"
                  onChange={UploadImage}
                  hidden
                  required
                  ref={inputRef}
                 />
                <label className="text-xs ">
                  <input type="checkbox" className="" checked={withoutImage} onChange={handleWithoutImage} />
                  <br />
                  Sin imagen
                </label>
              </div>
            );
          case "loading":
            return <LuLoader className="animate-spin text-4xl text-blue-500" />;

          case "loaded":
            return (
              <figure className="input-image">
                <CldImage
                  src={imageId}
                  alt="product image"
                  fill
                  className="h-full aspect-square object-cover rounded-sm"
                />
              </figure>
            );
        }
      })()}

      <input {...register("image")} hidden required />
    </div>
  );
};

export default ImageInput;
