import { addToCart, OutOfStockError, ProductNotFoundError } from "./cart.js";
import { products } from "./products.js";

const errorMessage = document.getElementById("error-message");

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
    addButton.addEventListener("click", () => {
      addButton.disabled = true;

      try {
        const cartCount = addToCart(product.productName);
        document.getElementById("cart-count").textContent = String(cartCount);
        errorMessage.textContent = "";
      } catch (error) {
        if (error instanceof OutOfStockError) {
          errorMessage.textContent = "This item is out of stock.";
        } else if (error instanceof ProductNotFoundError) {
          errorMessage.textContent = "We couldn't find this item.";
        } else {
          errorMessage.textContent = "We couldn't add this item. Please try again.";
        }
      } finally {
        addButton.disabled = false;
      }
    });

    card.append(name, category, price, addButton);
    productGrid.append(card);
  }
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
      renderProducts(products.filter((product) => product.category === category));
    });
    categoryFilters.append(categoryButton);
  }
}

renderCategoryFilters();
renderProducts(products);
