import Page from "./page.js";
import { browser, $ } from "@wdio/globals";
import { should, expect, assert } from "chai";

class LoginPage extends Page {
  get username() {
    return $("#username");
  }
  get password() {
    return $("#password");
  }
  get submitBtn() {
    return $('form button[type="submit"]');
  }
  get flash() {
    return $("#flash");
  }
  get headerLinks() {
    return $$("#header a");
  }

  async open() {
    await super.open("https://trello.com/home");
  }

  async navigateToLoginForm() {
    const loginBtn = await $('a[data-uuid*="_login"]');
    const loginText = await loginBtn.getText();
    assert.equal(loginText, "Log in");
    await this.waitAndClick(loginBtn);
  }

  async setUserName(userEmail) {
    const usernameInput = await $("input#username");
    await usernameInput.waitForDisplayed({ timeout: 3000 });
    await usernameInput.setValue(userEmail);
  }

  async continuesToSetPassword() {
    const continueBtn = await $("button#login-submit");
    await this.waitAndClick(continueBtn);
  }

  async setPassword(userPassword) {
    const passwordInput = await $("input#password");
    await passwordInput.waitForDisplayed({ timeout: 3000 });
    await passwordInput.setValue(userPassword);
  }



  async submit() {
    const loginSubmitBtn = await $("button#login-submit");
    await this.waitAndClick(loginSubmitBtn);
  }

  async getLogoDiv(){
   return await $('a[href*="/boards"]');
  }

  async login(email, pasword){
    await this.open();
    await this.navigateToLoginForm();
    await this.setUserName(email);
    await this.continuesToSetPassword();
    await this.setPassword(pasword);
    await this.submit();
    const logoDiv = await this.getLogoDiv();
    const hrefBoardsText = await logoDiv.getText();
    assert.equal(hrefBoardsText, "Boards");
  }
} 

export default new LoginPage();
