const products = [
  {
    productName: "Apple Magic Keyboard with Touch ID (USB-C)",
    price: 149.00,
    category: "Computer Accessories",
    inStock: true
  },
  {
    productName: "Wireless Mouse",
    price: 29.99,
    category: "Computer Accessories",
    inStock: true
  },
  {
    productName: "USB-C Hub",
    price: 49.99,
    category: "Computer Accessories",
    inStock: false
  },
  {
    productName: "Portable SSD",
    price: 89.99,
    category: "Storage",
    inStock: true
  }
];

const cart = [];

console.log("Products:", products);

function addToCart(productName) {
  const product = products.find((item) => item.productName === productName);

  if (!product) {
    console.log(`Product not found: ${productName}`);
    return;
  }

  if (!product.inStock) {
    console.log(`Product out of stock: ${productName}`);
    return;
  }

  cart.push(product);
  console.log(`Added to cart: ${product.productName}`);
}

function viewCart() {
  let total = 0;

  for (const item of cart) {
    console.log(`${item.productName}: $${item.price.toFixed(2)}`);
    total += item.price;
  }

  console.log(`Total: $${total.toFixed(2)}`);
}

function filterByCategory(category) {
  const matchingProducts = products.filter((product) => product.category === category);

  matchingProducts.forEach((product) => {
    console.log(`${product.productName}: $${product.price.toFixed(2)}`);
  });
}
