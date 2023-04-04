import { ShoppingBagOutline, ShoppingBagSolid } from "heroicons";
import { useCart } from "../lib/useCart.ts";

function CartButton() {
  const { displayCart: isOpen, openCart, total } = useCart();

  return (
    <button
      type="button"
      class="group -m-2 flex items-center p-2"
      onClick={openCart}
    >
      {total.value > 0
        ? (
          <ShoppingBagSolid
            className="h-6 w-6 flex-shrink-0 text-indigo-600 group-hover:text-indigo-700"
            aria-hidden="true"
          />
        )
        : (
          <ShoppingBagOutline
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        )}
      <div class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        {total}
      </div>
      <span class="sr-only">items in cart, view bag</span>
    </button>
  );
}

export default CartButton;
