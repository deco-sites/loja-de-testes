import { useState } from "preact/hooks";

import { Handlers, PageProps } from "$fresh/server.ts";
import { ChevronRightSolid } from "heroicons";

import Header from "$start/islands/Header.tsx";
import createClient from "$start/lib/supabase.ts";
import type { Order } from "$start/lib/types.ts";

export const handler: Handlers<Order> = {
  async POST(req, _ctx) {
    const data = await req.formData();
    const deliveryType = data.get("deliveryType");
    const supabase = createClient();

    const { data: order } = await supabase
      .from("orders")
      .update({
        fullName: data.get("fullName"),
        email: data.get("email"),
        deliveryType,
      })
      .eq("id", _ctx.params.id)
      .single();

    let location = `/orders/${order.id}/delivery-info/`;
    if (deliveryType === "pick_up") {
      location = `/orders/${order.id}/confirmation/`;
    }

    return new Response("", {
      status: 303,
      headers: { Location: location },
    });
  },
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
};

export default function OrderCustomerInfoPage(
  props: PageProps<Order>,
) {
  const { data: order } = props;

  const [deliveryType, setDeliveryType] = useState(order?.deliveryType || "");

  return (
    <>
      <Header includeCart={false} />

      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <ol
          class="flex items-center whitespace-nowrap min-w-0 pb-5"
          aria-label="Breadcrumb"
        >
          <li
            class="text-sm text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            <p class="flex items-center font-semibold">
              Customer Information
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
              Customer Information
            </h2>
          </div>
        </div>

        <form
          method="POST"
          action={`/orders/${order.id}/`}
          encType="multipart/form-data"
          class="flex flex-col"
        >
          <div class="py-3">
            <label
              for="id_fullName"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="id_fullName"
              required
              defaultValue={order.fullName}
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter your full name here."
            />
          </div>
          <div class="py-3">
            <label
              for="id_email"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="id_email"
              defaultValue={order.email}
              required
              class="py-3 px-4 block w-full border-1 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter your full name here."
            />
          </div>
          <div class="py-3">
            <label
              for="id_deliveryType"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              Delivery Type
            </label>
            <div class="flex gap-x-6">
              <div class="flex">
                <label
                  for="deliveryType-delivery"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    class="mt-0.5 mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="deliveryType-delivery"
                    value="delivery"
                    checked={deliveryType === "delivery"}
                    onClick={() => setDeliveryType("delivery")}
                  />
                  <span>Delivery</span>
                </label>
              </div>

              <div class="flex">
                <label
                  for="deliveryType-pick_up"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    class="mt-0.5 mr-2 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="deliveryType-pick_up"
                    value="pick_up"
                    checked={deliveryType === "pick_up"}
                    onClick={() => setDeliveryType("pick_up")}
                  />
                  <span>Pick-up (Sábado)</span>
                </label>
              </div>
            </div>
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
