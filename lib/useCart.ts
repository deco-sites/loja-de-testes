/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { computed, signal } from "@preact/signals";
import { ProductCommerce } from "./types.ts";

const INITIAL_STEP = "initial";
const FILL_CUSTOMER_DATA_STEP = "fill-customer-data";
const FILL_SHIPMENT_DATA_STEP = "fill-shipment-data";
const ORDER_CONFIRMATION_STEP = "confirm-order-information";
const ORDER_SUCCESS_STEP = "successfully-created-order";

const displayCart = signal(false);
const cartStep = signal(INITIAL_STEP);
const products = signal<ProductCommerce[]>([]);
const total = computed(() => products.value.length);
const totalPrice = computed(() =>
  products.value.map((p) => p.unitPrice * (p.quantity || 0)).reduce(
    (acc: number, unitPrice: number) => acc + unitPrice,
    0,
  )
);

const addProduct = (product: ProductCommerce, quantity: number) => {
  if (
    products.value.length === 0
  ) {
    products.value = [
      {
        id: product.id,
        name: product.name,
        unitPrice: product.unitPrice,
        quantity,
      },
    ];
  } else if (
    !products.value.some((p: ProductCommerce) => p.id === product.id)
  ) {
    products.value = [
      ...products.value,
      {
        id: product.id,
        name: product.name,
        unitPrice: product.unitPrice,
        quantity,
      },
    ];
  } else {
    const newProducts = [...products.value];
    newProducts.map(
      (p: ProductCommerce) => {
        if (p.id === product.id) {
          p.quantity = quantity;
        }
      },
    );
    products.value = newProducts;
  }
};

const setStep = (step: string) => {
  cartStep.value = step;
};

const openCart = () => {
  displayCart.value = true;
  setStep(INITIAL_STEP);
};

const closeCart = () => {
  displayCart.value = false;
  setStep(INITIAL_STEP);
};

const state = {
  displayCart,
  openCart,
  closeCart,
  products,
  total,
  totalPrice,
  addProduct,
  cartStep,
  setStep,
  stepStates: {
    INITIAL_STEP,
    FILL_CUSTOMER_DATA_STEP,
    FILL_SHIPMENT_DATA_STEP,
    ORDER_CONFIRMATION_STEP,
    ORDER_SUCCESS_STEP,
  },
};

export const useCart = () => state;
