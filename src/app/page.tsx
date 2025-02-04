import NotCheckedProduct from "@/components/home/NotCheckedProduct";
import SubLinks from "@/components/SubLinks";
import { categories, subcategories } from "@/globalConsts";
import { filterProducts } from "@/lib/mongo/products";
import { Category, Product } from "@/model/products";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const noImageProducts = (await getNoImageProducts()) as Product[];
  // const tags = await getAllTags();

  const page = Number(searchParams.page || 1);
  const subcategory = decodeURIComponent(searchParams.subcategory as string);
  const user = searchParams.user as string;
  const products = (await filterProducts({
    subcategory,
  })) as Product[];

  return (
    <main className="text-center px-5">
      <SubLinks user={user} />
      <ul className="flex flex-wrap gap-10">
        {products.map((product, index) => (
          <NotCheckedProduct
            product={{ ...product, checkedBy: user }}
            key={index}
          />
        ))}
        {/* <li>
          <Link href={`/?page=${page + 1}`}>Siguiente Pagina</Link>
        </li> */}
      </ul>
    </main>
  );
}
