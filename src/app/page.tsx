import NotCheckedProduct from "@/components/home/NotCheckedProduct";
import { toKebabCase } from "@/globalFunctions";
import { getAllTags, getNoImageProducts } from "@/lib/mongo/products";
import { Product } from "@/model/products";
import Link from "next/link";

export default async function Home() {
  const noImageProducts = (await getNoImageProducts()) as Product[];
  const tags = await getAllTags();

  return (
    <main className="text-center px-5">
      <h2>Productos sin imágenes </h2>
      <ul className="flex flex-wrap gap-10">
        {noImageProducts.map((product, index) => (
          <NotCheckedProduct product={product} key={index} />
        ))}
      </ul>
      <h2>tags</h2>
      <ul className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <li key={index} className="border-2 border-red-300">
            <Link href={`/tags/${toKebabCase(tag)}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
