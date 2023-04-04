import { XMarkSolid } from "heroicons";
import { useState } from "preact/hooks";

import { useCart } from "../lib/useCart.ts";
import formatPrice from "../lib/formatPrice.ts";
import AddToCart from "./AddToCart.tsx";

function CartModal() {
  const {
    displayCart: isOpen,
    products,
    total,
    totalPrice,
    setStep,
    cartStep,
    stepStates,
  } = useCart();

  const [deliveryType, setDeliveryType] = useState("");

  if (!isOpen.value) {
    return <></>;
  }

  return (
    <div
      class={`relative z-10`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {
        /* <!--
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
          --> */
      }
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      </div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex h-full items-end justify-end text-center sm:p-0">
          {
            /* <!--
                  Modal panel, show/hide based on modal state.

                  Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                  Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                --> */
          }
          <div class="relative transform bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg h-full">
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 absolute right-0"
              onClick={() => isOpen.value = false}
            >
              <span class="sr-only">Open menu</span>
              <XMarkSolid className="h-6 w-6" aria-hidden="true" />
            </button>

            <div class="bg-white px-4 pb-4 pt-10 sm:p-6 sm:pb-4">
              <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                  <form
                    action="/orders/"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <div class="p-1.5 min-w-full inline-block align-middle">
                      <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                class="px-6 py-3 text-left text-gray-500 uppercase"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                class="px-6 py-3 text-left text-gray-500 uppercase"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                class="px-6 py-3 text-right text-gray-500 uppercase"
                              >
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.value.map((product) => (
                              <tr class="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
                                <td class="px-6 py-2 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">
                                  {product.name}
                                </td>
                                <td class="px-6 py-2 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                  <AddToCart product={product} />
                                  {/* TODO: This is so wrong */}
                                  <input
                                    type="hidden"
                                    name={`unitPrice-${product.id}`}
                                    id={`id_unitPrice-${product.id}`}
                                    value={product.unitPrice}
                                  />
                                </td>
                                <td class="px-6 py-2 whitespace-nowrap text-right font-medium">
                                  {formatPrice(product.unitPrice)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td
                                colSpan={4}
                                class="px-6 py-4 whitespace-nowrap text-right font-medium"
                              >
                                {`Total of ${formatPrice(totalPrice.value)}`}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div class="py-3">
                        <div class="p-2 flex justify-between">
                          <input
                            type="hidden"
                            name="totalPrice"
                            id="id_totalPrice"
                            value={totalPrice.value}
                          />
                          <input
                            type="hidden"
                            name="totalQuantity"
                            id="id_totalQuantity"
                            value={total.value}
                          />
                          <input
                            type="hidden"
                            name="products"
                            id="id_products"
                            value={products.value.map((p) => p.id).join(",")}
                          />
                          <button
                            type="submit"
                            class="bg-green-500 hover:bg-green-700 text-center text-white font-bold py-2 px-4 rounded w-full"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
