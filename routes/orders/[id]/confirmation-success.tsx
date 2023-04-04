import { Handlers, PageProps } from "$fresh/server.ts";
import { CheckCircleSolid } from "heroicons";

import Header from "$start/islands/Header.tsx";
import createClient from "$start/lib/supabase.ts";
import type { Order } from "$start/lib/types.ts";

export const handler: Handlers<Order> = {
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

export default function OrderConfirmationSuccessPage(
  props: PageProps<Order>,
) {
  const { data: order } = props;
  return (
    <>
      <Header />

      <div class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mb-5 pb-5 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Order #{order.id}
            </h2>
          </div>
        </div>

        <div
          class="max-w-xs bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700"
          role="alert"
        >
          <div class="flex p-4">
            <div class="flex-shrink-1 h-6 w-6 text-green-500">
              <CheckCircleSolid aria-hidden="true" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-700 dark:text-gray-400">
                This is a success message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
