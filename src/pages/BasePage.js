export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(locator) {
    await locator.click();
  }

  async type(locator, text) {
    await locator.fill(text);
  }

  async getText(locator) {
    await locator.innerText();
  }

  async isVisible(locator) {
    await locator.isVisible();
  }
}
