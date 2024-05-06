import { browser } from "@wdio/globals";

export default class Page {
  constructor() {
    this.title = "trello.com";
  }

  async open(path) {
    await browser.url(path);
  }

  async waitAndClick(searchBtn) {
    await searchBtn.waitForDisplayed({ timeout: 5000 });
    await searchBtn.waitForClickable({ timeout: 3000 });
    await searchBtn.click();
  }
}
