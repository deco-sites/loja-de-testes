import { Handlers, PageProps } from "$fresh/server.ts";
import { ChevronRightSolid } from "heroicons";

import Header from "$start/islands/Header.tsx";
import createClient from "$start/lib/supabase.ts";
import type { Order } from "$start/lib/types.ts";

export const handler: Handlers<Order> = {
  async GET(_req, _ctx) {
    const supabase = createClient();
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", _ctx.params.id)
      .limit(1)
      .single();

    return _ctx.render(order);
  },
  async POST(req, _ctx) {
    const data = await req.formData();
    const supabase = createClient();

    const { data: order } = await supabase
      .from("orders")
      .update({
        city: data.get("city"),
        district: data.get("district"),
        postalCode: data.get("postalCode"),
        addressLine: data.get("addressLine"),
        addressLine2: data.get("addressLine2"),
        deliveryDate: data.get("deliveryDate"),
      })
      .eq("id", _ctx.params.id)
      .single();

    return new Response("", {
      status: 303,
      headers: { Location: `/orders/${order.id}/confirmation/` },
    });
  },
};

export default function OrderDeliveryInfoPage(
  props: PageProps<Order>,
) {
  const { data: order } = props;

  return (
    <>
      <Header />

      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
            <p class="flex items-center font-semibold">
              Delivery info
              <span class="mx-2 w-4 h-4">
                <ChevronRightSolid />
              </span>
            </p>
          </li>

          <li
            class="text-sm text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            <p class="flex items-center">
              Order confirmation
            </p>
          </li>
        </ol>

        <div class="mb-5 pb-5 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Enter the delivery information
            </h2>
          </div>
        </div>

        <form
          method="POST"
          action={`/orders/${order.id}/delivery-info/`}
          encType="multipart/form-data"
          class="flex flex-col"
        >
          <div class="py-3">
            <label
              for="id_city"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              City
            </label>
            <select
              id="id_city"
              name="city"
              defaultValue={order.district}
              required
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
            >
              <option selected={!order.city}>Open this select menu</option>
              <option selected={order.city === "recife"} value="recife">
                Recife
              </option>
              <option selected={order.city === "olinda"} value="olinda">
                Olinda
              </option>
              <option selected={order.city === "jaboatão"} value="jaboatão">
                Jaboatão
              </option>
            </select>
          </div>
          <div class="py-3">
            <label
              for="id_district"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              District
            </label>
            <input
              type="text"
              required
              id="id_district"
              name="district"
              defaultValue={order.district}
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter district here."
            />
          </div>
          <div class="py-3">
            <label
              for="id_postalCode"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Postal Code
            </label>
            <input
              type="text"
              required
              id="id_postalCode"
              name="postalCode"
              defaultValue={order.postalCode}
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter postalCode here."
            />
          </div>
          <div class="py-3">
            <label
              for="id_addressLine"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Address Line
            </label>
            <input
              type="text"
              required
              id="id_addressLine"
              name="addressLine"
              defaultValue={order.addressLine}
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter your addressLine here."
            />
          </div>
          <div class="py-3">
            <label
              for="id_addressLine2"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Address Line 2
            </label>
            <input
              type="text"
              required
              id="id_addressLine2"
              name="addressLine2"
              defaultValue={order.addressLine2}
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter your addressLine2 here."
            />
          </div>
          <div class="py-3">
            <label
              for="id_deliveryDate"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Delivery Date
            </label>
            <input
              type="text"
              required
              id="id_deliveryDate"
              name="deliveryDate"
              defaultValue={order.deliveryDate}
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter your deliveryDate here."
            />
          </div>

          <div class="py-5">
            <div class="p-2 flex justify-between">
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
