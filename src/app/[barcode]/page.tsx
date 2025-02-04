import EditProductForm from "@/components/product/editProduct/EditProductForm";
import { getProductByBarcode } from "@/lib/mongo/products";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
const ProductPage = async ({ params, searchParams }: { params: { barcode: string }, searchParams: SearchParams }) => {

  const { barcode } = params;
  const product = await getProductByBarcode(barcode);

  if (!product) return <p>No product found for barcode: {barcode}</p>;

  const {
    name,
    brand,
    category,
    measure,
    checked,
    tags,
    description,
    image,
  } = product;

  return <EditProductForm product={product} />;
};

export default ProductPage;
