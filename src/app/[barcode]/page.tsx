import EditProductForm from "@/components/product/editProduct/EditProductForm";
import { getProductByBarcode } from "@/lib/mongo/products";
import React from "react";

const ProductPage = async ({ params }: { params: { barcode: string } }) => {
  const { barcode } = params;
  const product = await getProductByBarcode(barcode);

  if (!product) return <p>No product found for barcode: {barcode}</p>;

  const {
    name,
    brand,
    category,
    subcategory,
    measure,
    checked,
    description,
    image,
  } = product;

  return <EditProductForm product={product} />;
};

export default ProductPage;
