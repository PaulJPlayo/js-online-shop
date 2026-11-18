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

function renderProducts(productsToDisplay) {
  const productGrid = document.getElementById("product-grid");
  productGrid.textContent = "";

  for (const product of productsToDisplay) {
    const card = document.createElement("article");
    const name = document.createElement("h3");
    const category = document.createElement("p");
    const price = document.createElement("p");
    const addButton = document.createElement("button");

    name.textContent = product.productName;
    category.textContent = product.category;
    price.textContent = `$${product.price.toFixed(2)}`;
    addButton.type = "button";
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product.productName));

    card.append(name, category, price, addButton);
    productGrid.append(card);
  }
}

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
  document.getElementById("cart-count").textContent = String(cart.length);
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

  return matchingProducts;
}

function renderCategoryFilters() {
  const categoryFilters = document.getElementById("category-filters");
  const categories = new Set(products.map((product) => product.category));

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.textContent = "All";
  allButton.addEventListener("click", () => renderProducts(products));
  categoryFilters.append(allButton);

  for (const category of categories) {
    const categoryButton = document.createElement("button");
    categoryButton.type = "button";
    categoryButton.textContent = category;
    categoryButton.addEventListener("click", () => {
      renderProducts(filterByCategory(category));
    });
    categoryFilters.append(categoryButton);
  }
}

renderCategoryFilters();
renderProducts(products);
