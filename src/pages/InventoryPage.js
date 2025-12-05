import { BasePage } from "./BasePage.js";

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator("span.title");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartButton = page.locator(".shopping_cart_link");
    this.inventoryItems = page.locator(".inventory_item");
  }

  async getTitleText() {
    return this.title.textContent();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(this.cartBadge.innerText(), 10);
    }
    return 0;
  }

  async addProduct(productName) {
    const product = this.inventoryItems.filter({ hasText: productName });
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}
