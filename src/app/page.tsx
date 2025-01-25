import NotCheckedProduct from "@/components/home/NotCheckedProduct";
import { toKebabCase } from "@/globalFunctions";
import {
  getAllProducts,
  getAllTags,
  getNoImageProducts,
} from "@/lib/mongo/products";
import { Product } from "@/model/products";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const noImageProducts = (await getNoImageProducts()) as Product[];
  // const tags = await getAllTags();
  const sortOrder = searchParams.sort;
  const page = Number(searchParams.page || 1);
  const products = await getAllProducts(page) as Product[];

  return (
    <main className="text-center px-5">
      {/* <h2>Productos sin imágenes </h2>
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
      </ul> */}

      <h1>Productos Sin Checkear</h1>
      <ul className="flex flex-wrap gap-10">
        {products.map((product, index) => (
          <NotCheckedProduct product={product} key={index} />
        ))}
        <li>
          <Link href={`/?page=${page + 1}`}>
            Siguiente Pagina
          </Link>
        </li>
      </ul>
    </main>
  );
}
