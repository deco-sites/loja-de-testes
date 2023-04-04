import formatPrice from "../lib/formatPrice.ts";
import { ProductCommerce } from "../lib/types.ts";
import AddToCart from "../islands/AddToCart.tsx";

export interface Props {
  product: ProductCommerce;
}

export default function ProductCard({ product }: Props) {
  return (
    <div class="group relative border-2 border-grey-600" key={product.id}>
      <div class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
          alt="Front of men&#039;s Basic Tee in black."
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div class="p-2 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" class="inset-0"></span>
              {product.name}
            </a>
          </h3>
          <p class="mt-1 text-sm text-gray-500">Black</p>
        </div>
        <div>
          <p class="text-sm text-right font-medium text-gray-900">
            {formatPrice(product.unitPrice)}
          </p>
        </div>
      </div>

      <AddToCart product={product} />
    </div>
  );
}
