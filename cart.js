import { products } from "./products.js";

export class ProductNotFoundError extends Error {}
export class OutOfStockError extends Error {}

const cart = [];

export function addToCart(productName) {
  const product = products.find((item) => item.productName === productName);

  if (!product) {
    throw new ProductNotFoundError(`Product not found: ${productName}`);
  }

  if (!product.inStock) {
    throw new OutOfStockError(`Product out of stock: ${productName}`);
  }

  cart.push(product);
  return cart.length;
}

export function getCartTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}
