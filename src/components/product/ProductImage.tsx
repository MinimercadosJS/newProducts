import { CldImage } from "next-cloudinary";

const ProductImage = ({ src, alt, className }: { src: string; alt: string, className?: string }) => {

  return (
    <figure className="relative w-full overflow-clip aspect-square">
      <CldImage 
      src={src} 
      alt={alt}
      className={`object-contain object-center ${className}`}
      fill
      />
    </figure>
  );
};

export default ProductImage;
