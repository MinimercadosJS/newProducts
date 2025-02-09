import NotCheckedProduct from "@/components/home/NotCheckedProduct";
import SubLinks from "@/components/SubLinks";
import { getAllBarcodeProducts } from "@/lib/mongo/products/barcode";
import { BarcodeProduct } from "@/model/products/barcode";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const noImageProducts = (await getNoImageProducts()) as BarcodeProduct[];
  // const tags = await getAllTags();

  const page = Number(searchParams.page || 1);
  const subcategory = decodeURIComponent(searchParams.subcategory as string);
  const user = searchParams.user as string;
  const products = (await getAllBarcodeProducts(page)) as BarcodeProduct[];

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
