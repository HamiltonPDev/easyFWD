import { ProductsWrapper } from "app/components/Store/ProductsWrapper";
import { getProducts } from "app/services/shopify";

interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams?: string;
}

export default async function Category(props: CategoryProps) {
  const products = await getProducts();
  const { categories } = props.params;
  return (
    <div>
      <ProductsWrapper products={products} />
    </div>
  );
}
