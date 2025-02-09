import { BarcodeProduct } from "@/model/products/barcode";
import EditProductForm from "@/components/product/editProduct/EditProductForm";
import { getProductByBarcode } from "@/lib/mongo/products/barcode";

const updateProductByBarcode = async ({
  params,
}: {
  params: { barcode: string };
}) => {
  const getProduct = await getProductByBarcode(params.barcode);
  if (!getProduct) {
    return <div>BarcodeProduct not found.</div>;
  }

  const product = getProduct as BarcodeProduct;

  return (
      <EditProductForm product={product} />
  );
};

export default updateProductByBarcode;
