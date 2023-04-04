import { Handlers, PageProps } from "$fresh/server.ts";
import { ChevronRightSolid } from "heroicons";

import Header from "$start/islands/Header.tsx";
import createClient from "$start/lib/supabase.ts";
import type { Order } from "$start/lib/types.ts";
import formatPrice from "../../../lib/formatPrice.ts";

export const handler: Handlers<Order> = {
  async POST(_req, _ctx) {
    const supabase = createClient();

    const { data: order } = await supabase
      .from("orders")
      .update({
        status: "complete",
      })
      .eq("id", _ctx.params.id)
      .single();

    return new Response("", {
      status: 303,
      headers: { Location: `/orders/${order.id}/confirmation-success/` },
    });
  },
  async GET(_req, _ctx) {
    const supabase = createClient();
    const { data: order } = await supabase
      .from("orders")
      .select(
        `
          id, totalPrice, fullName, email,
          city, district, postalCode,
          addressLine, addressLine2,
          deliveryDate, deliveryType,
          productsOnOrders(
            unitPrice,
            quantity,
            product(name)
          )
        `,
      )
      .eq("id", _ctx.params.id)
      .limit(1)
      .single();

    return _ctx.render(order);
  },
};

export default function OrderConfirmationPage(
  props: PageProps<Order>,
) {
  const { data: order } = props;

  return (
    <>
      <Header />

      <div class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <ol
          class="flex items-center whitespace-nowrap min-w-0 pb-5"
          aria-label="Breadcrumb"
        >
          <li
            class="text-sm text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            <a
              class="flex items-center hover:text-blue-600"
              href={`/orders/${order.id}`}
            >
              Customer Information
              <span class="mx-2 w-4 h-4">
                <ChevronRightSolid />
              </span>
            </a>
          </li>

          <li
            class="text-sm text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            <a
              class="flex items-center hover:text-blue-600"
              href={`/orders/${order.id}/delivery-info/`}
            >
              Delivery info
              <span class="mx-2 w-4 h-4">
                <ChevronRightSolid />
              </span>
            </a>
          </li>

          <li
            class="text-sm text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            <p class="flex items-center font-semibold">
              Order confirmation
            </p>
          </li>
        </ol>

        <div class="mb-5 pb-5 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Order confirmation page
            </h2>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div>
            <div class="grid space-y-3">
              <dl class="grid sm:flex gap-x-3 text-sm">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">
                  Billed to:
                </dt>
                <dd class="text-gray-800 dark:text-gray-200">
                  <a
                    class="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                    href="#"
                  >
                    {order.email}
                  </a>
                </dd>
              </dl>

              <dl class="grid sm:flex gap-x-3 text-sm">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">
                  Order details:
                </dt>
                <dd class="font-medium text-gray-800 dark:text-gray-200">
                  <span class="block font-semibold">{order.fullName}</span>
                  {order.deliveryType === "delivery" && (
                    <address class="not-italic font-normal">
                      {order.city}, {order.district} - {order.postalCode}
                      <br />
                      {order.addressLine},<br />
                      {order.addressLine2}
                    </address>
                  )}
                </dd>
              </dl>

              {order.deliveryType === "pick_up" && (
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">
                    Pick-up date:
                  </dt>
                  <dd class="font-medium text-gray-800 dark:text-gray-200">
                    Sábado
                  </dd>
                </dl>
              )}
            </div>
          </div>
          <div>
            <div class="grid space-y-3">
              <dl class="grid sm:flex gap-x-3 text-sm">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">
                  Invoice number:
                </dt>
                <dd class="font-medium text-gray-800 dark:text-gray-200">
                  #{order.id}
                </dd>
              </dl>

              <dl class="grid sm:flex gap-x-3 text-sm">
                <dt class="min-w-[150px] max-w-[200px] text-gray-500">
                  Delivery type:
                </dt>
                <dd class="font-medium text-gray-800 dark:text-gray-200">
                  {order.deliveryType === "delivery" ? "Delivery" : "Pick-up"}
                </dd>
              </dl>

              {order.deliveryType === "delivery" && (
                <dl class="grid sm:flex gap-x-3 text-sm">
                  <dt class="min-w-[150px] max-w-[200px] text-gray-500">
                    Delivery date:
                  </dt>
                  <dd class="font-medium text-gray-800 dark:text-gray-200">
                    {order.deliveryDate}
                  </dd>
                </dl>
              )}
            </div>
          </div>
        </div>

        <div class="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
          <div class="hidden sm:grid sm:grid-cols-5">
            <div class="sm:col-span-3 text-xs font-medium text-gray-500 uppercase">
              Product
            </div>
            <div class="text-left text-xs font-medium text-gray-500 uppercase">
              Quantity
            </div>
            <div class="text-left text-xs font-medium text-gray-500 uppercase">
              Unit Price
            </div>
          </div>

          <div class="hidden sm:block border-b border-gray-200 dark:border-gray-700">
          </div>

          {order.productsOnOrders.map((product) => (
            <>
              <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div class="col-span-full sm:col-span-3">
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Product
                  </h5>
                  <div class="flex items-center gap-x-4">
                    <img
                      class="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-md"
                      src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                      alt="Image Description"
                    />
                    <div>
                      <p class="font-medium text-gray-800 dark:text-gray-200">
                        {product.product.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </h5>
                  <p class="text-gray-800 dark:text-gray-200">
                    {product.quantity}
                  </p>
                </div>
                <div>
                  <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </h5>
                  <p class="text-gray-800 dark:text-gray-200">
                    {formatPrice(product.unitPrice)}
                  </p>
                </div>
              </div>
              <div class="sm:hidden border-b border-gray-200 dark:border-gray-700">
              </div>
            </>
          ))}
        </div>

        <div class="mt-8 flex sm:justify-end">
          <div class="w-full max-w-2xl sm:text-right space-y-2">
            <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                <dt class="col-span-3 text-gray-500">Subotal:</dt>
                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  {formatPrice(order.totalPrice)}
                </dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                <dt class="col-span-3 text-gray-500">Delivery Fee:</dt>
                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  {formatPrice(1000)}
                </dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
                <dt class="col-span-3 text-gray-500">Total:</dt>
                <dd class="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                  {formatPrice(order.totalPrice + 1000)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="py-5">
          <form
            method="POST"
            action={`/orders/${order.id}/confirmation/`}
            encType="multipart/form-data"
            class="p-2 flex justify-between"
          >
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
