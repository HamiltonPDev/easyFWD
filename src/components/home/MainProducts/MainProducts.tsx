/*
  MainProducts component is responsible for displaying the main products on the home page.
  It fetches the products from the Shopify store using the GraphQL Admin API.
*/
import styles from "./MainProducts.module.sass";
import Image from "next/image";

const getProducts = async () => {
  /*
    The GraphQL query to fetch the first 23 products from the Shopify store.
  */
  const query = `{
    products (first: 5) {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }`;
  try {
    const response = await fetch(
      `${process.env.SHOPIFY_HOSTNAME}/admin/api/2025-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN || "",
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await response.json();

    if (data.errors) console.error("GraphQL errors: ", data.errors);
    if (!data.data) console.error("No data found in response: ", data);

    /*
      Extract the products from the GraphQL response.
    */
    interface Product {
      id: string;
      title: string;
      description: string;
    }

    interface Edge {
      node: Product;
    }
    const products = data.data.products.edges.map((edge: Edge) => edge.node);
    console.log("products: ", data.data.products);
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

/*
  The MainProducts component fetches the products from the Shopify store and displays them.
*/
export const MainProducts = async () => {
  const products = await getProducts();

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map(
          (product: {
            id: string;
            title: string;
            description: string;
            images: { src: string }[];
          }) => {
            // const imageSrc = product.images[0].src;
            return (
              <article key={product.id}>
                <p>{product.title}</p>
                {/* <Image
                  src={imageSrc}
                  fill
                  alt={product.title}
                  loading="eager"
                /> */}
              </article>
            );
          }
        )}
      </div>
    </section>
  );
};
