import { Handlers } from "$fresh/server.ts";

import createClient from "../../lib/supabase.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const data = await req.formData();
    const supabase = createClient();

    const productsIds = data.get("products")?.toString().split(",");
    const totalQuantity = data.get("totalQuantity");
    const totalPrice = data.get("totalPrice");

    const orderData = {
      totalPrice,
      quantity: totalQuantity,
    };

    const { data: orderCreated, error: orderCreationError } = await supabase
      .from("orders")
      .insert(orderData)
      .select();

    if (!orderCreated) {
      console.log("Something went wrong while creating the order");
      console.log(orderCreationError);
      return Response.redirect("/", 307);
    }

    const order = orderCreated[0];

    const orderProductsData = productsIds?.map((productId) => {
      const quantity = data.get(`quantity-${productId}`);
      const unitPrice = data.get(`unitPrice-${productId}`);
      return {
        product: productId,
        quantity,
        unitPrice,
        order: order.id,
      };
    });

    if (!orderProductsData) {
      console.log("Something went wrong while retrieving the order");
      return Response.redirect("/", 307);
    }

    const {
      data: productsOnOrdersCreated,
      error: productsOnOrdersCreationError,
    } = await supabase
      .from("productsOnOrders")
      .insert(orderProductsData)
      .select();

    if (!productsOnOrdersCreated) {
      console.log("Something went wrong while creating the M2M table.");
      console.log(productsOnOrdersCreationError);
      return ctx.render();
    }

    return new Response("", {
      status: 303,
      headers: { Location: `/orders/${order.id}/` },
    });
  },
};
