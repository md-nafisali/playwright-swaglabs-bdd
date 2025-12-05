import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { users } from "../utils/testData.js";

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await use(page);
  },
});

export { test, expect };
