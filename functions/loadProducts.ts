import type { LoaderFunction } from "$live/std/types.ts";

import type { Product } from "../lib/types.ts";
import createClient from "../lib/supabase.ts";

// Return type of this loader
export interface Props {
  count?: number;
}

const loadProducts: LoaderFunction<Props, Product[] | null> = async (
  _req,
  _ctx,
) => {
  const client = createClient();
  const { data: products, error } = await client.from("products").select("*");

  if (error !== null) {
    console.log("Something went wrong");
  }

  return {
    data: products,
  };
};

export default loadProducts;
