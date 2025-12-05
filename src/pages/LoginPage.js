import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginBtn = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    await this.page.goto("/");
    //await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async getErrorMessageText() {
    return this.errorMessage.innerText();
  }
}
