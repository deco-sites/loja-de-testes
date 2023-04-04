import { ShoppingCartSolid } from "heroicons";

import CartButton from "../islands/CartButton.tsx";

interface Props {
  includeCart?: boolean;
}

export default function Navbar(props: Props) {
  return (
    <div class="bg-white fixed top-0 z-30 w-full z-10	drop-shadow-sm">
      <header class="relative border-b border-gray-200">
        <nav
          aria-label="Top"
          class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div class="flex h-16 items-center">
              {/* Logo */}
              <div class="ml-4 flex lg:ml-0">
                <a href="/" class="flex text-green-500">
                  <div className="w-6 h-6 mr-2">
                    <ShoppingCartSolid />
                  </div>
                  <div class="text-green-600">Your Company</div>
                </a>
              </div>

              {props.includeCart && (
                <div class="ml-auto flex items-center">
                  {/* Cart */}
                  <div class="ml-4 flow-root lg:ml-6">
                    <CartButton />
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
