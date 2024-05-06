import { expect, browser, $ } from "@wdio/globals";

const pageUrl="https://trello.com/home";
const userEmail="";
const userPassword="";



describe("My Login application", () => {
  beforeEach(async () => {
    await browser.url(pageUrl);
  });

  it("should login with valid credentials", async () => {
    //setup

    // executeA
    const loginBtn = await $('a[data-uuid*="_login"]');
    await waitAndClick(loginBtn);

    const usernameInput = await $("input#username");
    await usernameInput.waitForDisplayed({ timeout: 3000 });
    await usernameInput.setValue(userEmail);

    const continueBtn = await $("button#login-submit");
    await waitAndClick(continueBtn);

    const passwordInput = await $("input#password");
    await passwordInput.waitForDisplayed({ timeout: 3000 });
    await passwordInput.setValue(userPassword);

    const loginSubmitBtn = await $("button#login-submit");
    await waitAndClick(loginSubmitBtn);

    const logoDiv = await $('a[href*="/boards"]');
    await logoDiv.waitUntil(
      async function () {
        const innerText = await this.getText();
        return innerText === "Boards";
      },
      {
        timeout: 5000,
        timeoutMsg: "expected text to be different after 5s",
      }
    );
  });

  async function waitAndClick(searchBtn) {
    await searchBtn.waitForDisplayed({ timeout: 3000 });
    await searchBtn.waitForClickable({ timeout: 3000 });
    await searchBtn.click();
  }
});
