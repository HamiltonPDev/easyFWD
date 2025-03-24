import { ProductCard } from "../ProductCard";
import styles from "./ProductsWrapper.module.scss";

interface ProductType {
  id: string;
  handle: string;
  name: string;
  title: string;
}

interface ProductsWrapperPropsInterface {
  products: ProductType[];
}

export const ProductsWrapper = ({
  products,
}: ProductsWrapperPropsInterface) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
