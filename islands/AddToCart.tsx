import { useState } from "preact/hooks";

import { ProductCommerce } from "../lib/types.ts";
import { useCart } from "../lib/useCart.ts";

const MINIMUM_QUANTITY_VALUE = 0;

interface Props {
  product: ProductCommerce;
}

export default function AddToCart(props: Props) {
  const [quantity, setQuantity] = useState(
    props.product.quantity || MINIMUM_QUANTITY_VALUE,
  );
  const { addProduct } = useCart();

  const handleChangeQuantity = (quantity: number) => {
    setQuantity(quantity);
    addProduct(props.product, quantity);
  };

  return (
    <div>
      {quantity === MINIMUM_QUANTITY_VALUE && (
        <div class="p-2 flex justify-between">
          <button
            type="button"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => handleChangeQuantity(1)}
          >
            Add to Cart
          </button>
        </div>
      )}
      {quantity !== MINIMUM_QUANTITY_VALUE && (
        <div class="p-2 flex justify-between">
          <button
            type="button"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => handleChangeQuantity(quantity - 1)}
          >
            -
          </button>
          <input
            class="text-center font-bold w-full justify-center flex border-2 border-gray-200"
            name={`quantity-${props.product.id}`}
            id={`id_quantity-${props.product.id}`}
            readonly
            value={quantity}
          />
          <button
            type="button"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => handleChangeQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
