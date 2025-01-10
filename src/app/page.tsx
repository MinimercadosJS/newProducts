import NotCheckedProduct from "@/components/home/NotCheckedProduct";
import { getNotCheckedProducts } from "@/lib/mongo/products";
import { Product } from "@/model/products";

export default async function Home() {
  const noImageProducts = (await getNotCheckedProducts()) as Product[];

  return (
    <main className="text-center px-5">
      <h1>Productos sin checkear: </h1>

      <ul className="flex flex-wrap gap-10">
        {noImageProducts.map((product, index) => (
          <NotCheckedProduct product={product} key={index} />
        ))}
      </ul>
    </main>
  );
}