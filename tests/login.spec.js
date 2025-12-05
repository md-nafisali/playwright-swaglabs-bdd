import { test, expect } from "../src/fixtures/baseTest.js";
import { allure } from "allure-playwright";
import { users } from "../src/utils/testData.js";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `test-results/${testInfo.title.replace(/\s+/g, "_")}.png`,
      fullPage: true,
    });
  }
});

test.describe("Login Functionality", () => {
  test("Valid Login", async ({ loginPage, inventoryPage }) => {
    allure.epic("Authentication");
    allure.feature("Login");
    allure.story("Valid Login");
    allure.severity("critical");
    allure.description(
      "Verify that a valid user can log in and access the inventory page."
    );

    await allure.step("Login as standard user", async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await allure.step("Verify inventory title is Products", async () => {
      await expect(await inventoryPage.getTitleText()).toBe("Products");
    });
  });

  test("Invalid Login", async ({ loginPage }) => {
    allure.epic("Authentication");
    allure.feature("Login");
    allure.story("Invalid Login");
    allure.severity("critical");
    allure.description(
      "Verify that a user cannot log in with the wrong credentials"
    );

    await loginPage.login("fakeUsername", "fakePassword");

    const error = await loginPage.getErrorMessageText();

    await expect(error).toContain("Username and password do not match");
  });

  test("Missing Password", async ({ loginPage }) => {
    allure.epic("Authentication");
    allure.feature("Login");
    allure.story("Missing Password");
    allure.severity("critical");
    allure.description("Verify that a user cannot log in without a password");

    await allure.step("Try login without username", async () => {
      await loginPage.login("standard_user", "");
    });

    await allure.step("Verify username required error", async () => {
      const error = await loginPage.getErrorMessageText();
      await expect(error).toContain("Password is required");
    });
  });

  test("Missing Username", async ({ loginPage }) => {
    allure.epic("Authentication");
    allure.feature("Login");
    allure.story("Missing Username");
    allure.severity("critical");
    allure.description("Verify that a user cannot log in without a username");

    await allure.step("Try login without username", async () => {
      await loginPage.login("", "secret_sauce");
    });

    await allure.step("Verify username required error", async () => {
      const error = await loginPage.getErrorMessageText();
      await expect(error).toContain("Usernam is required");
    });
  });
});
