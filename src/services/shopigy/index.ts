/*
  MainProducts component is responsible for displaying the main products on the home page.
  It fetches the products from the Shopify store using the GraphQL Admin API.
*/
import { env } from "app/config/env";
import { shopifyUrls } from "./urls";

export const getProducts = async () => {
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
        shopifyUrls.products.all,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": env.SHOPIFY_ACCESS_TOKEN,
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