import { kebabToLowerCase } from "@/globalFunctions";
import { getProductsWithTag } from "@/lib/mongo/products";

const TagPage = async ({ params }: { params: Promise<{ tag: string }> }) => {
  const { tag } = await params;
  const decodedTag =kebabToLowerCase( decodeURIComponent(tag));
  const tagProducts = await getProductsWithTag(decodedTag);

  return (
    <div>
        <h2>Tag: {decodedTag}</h2>

      
      {tagProducts.map((product, key) => (
        <span key={key}>{product.name}</span>
      ))}
    </div>
  );
};

export default TagPage;
