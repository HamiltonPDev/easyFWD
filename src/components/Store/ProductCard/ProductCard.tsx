import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.sass";

interface ProductType {
  handle: string;
  id: string;
  name: string;
  title: string;
}

interface ProductCardPropsInterface {
  product: ProductType;
}

export const ProductCard = ({ product }: ProductCardPropsInterface) => {
  return (
    <Link
      href={`/article/${product.handle}?id=${product.id}`}
      className={styles.ProductCard__link}
    >
      <article className={styles.ProductCard}>
        <Image
          src={product.name}
          alt={product.title}
          quality={80}
          height={320}
          width={320}
          loading="eager"
        />
        <div className={styles.ProductCard__info}>
          <h3>{product.title}</h3>
        </div>
      </article>
    </Link>
  );
};
