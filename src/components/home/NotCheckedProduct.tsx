import { Product } from "@/model/products";
import Link from "next/link";

const NotCheckedProduct = ({ product }: { product: Product }) => {
  const { name, barcode, } = product;

  return (
    <li className="bg-white/50 px-2 ">
      <p className="text-xl ">{name}</p>
      <Link href={`/${barcode}`}> ir a editar</Link>
    </li>
  );
};

export default NotCheckedProduct;
