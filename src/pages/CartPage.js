import BasePage from './BasePage.js';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.inventory_item_name');
        this.checkoutButton = page.getByRole('button', { name : 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async getItemName() {
        const names = await this.cartItemNames.allInnerTexts();
        return names.map(name => name.trim());
    }

    async getItemCount() {
        return await this.cartItems.count();
    }
}