export type Product = {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
};

export type ProductCommerce = {
  name: string;
  id: string;
  quantity?: number;
  unitPrice: number;
};

export type Cart = {
  id: string;
  quantity: number;
};

export type ProductsOnOrders = {
  name: string;
  unitPrice: number;
  quantity: number;
  product: {
    name: string;
  };
};

export type Order = {
  id: string;
  totalPrice: number;
  email: string;
  fullName: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  addressLine2: string;
  shippingCost: number;
  deliveryType: string;
  deliveryDate: string;
  createdAt: string;
  productsOnOrders: ProductsOnOrders[];
};
