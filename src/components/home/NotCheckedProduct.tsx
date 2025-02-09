import { BarcodeProduct } from "@/model/products/barcode";
import Link from "next/link";
import ProductImage from "../product/ProductImage";
import { categories, subcategories } from "@/utils/consts";
import clsx from "clsx";
import { verifyTitleCase } from "@/utils/functions";

const NotCheckedProduct = ({ product }: { product: BarcodeProduct }) => {
  const { name, barcode, image, searchString, category, subcategory, brand , checkedBy} =
    product;

  const validCategory = categories.includes(category);
  const validSubcategory = subcategories[category]?.includes(subcategory);
  const validName = verifyTitleCase(name);
  const validBrand = verifyTitleCase(brand);
  const validProduct =
    validCategory && validSubcategory && validName && validBrand;
  return (
    <li
      className={clsx([
        !validProduct ? "border-red-500" : "border-gray-200",
        "flex flex-col border-2 w-44 p-2 justify-between",
      ])}
    >
      <div className="flex flex-col ">
        <span className={clsx([!validCategory && "text-red-500"])}>
          {category}
        </span>
        <span className={clsx([!validSubcategory && "text-red-500"])}>
          {subcategory || "Sin subcategoría"}
        </span>
        -
        <span className={clsx([!validBrand && "text-red-500", "text-lg"])}>
          {brand}
        </span>
      </div>
      <ProductImage src={image} alt={searchString} />
      <p className={clsx([!validName && "text-red-500", "text-lg"])}>{name}</p>
      <Link href={`/${barcode}?user=${checkedBy}`}> ir a editar</Link>
    </li>
  );
};

export default NotCheckedProduct;
