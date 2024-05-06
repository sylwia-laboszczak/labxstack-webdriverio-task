import {
  Given,
  When,
  Then,
  setDefaultTimeout,
  After,
  Before,
  AfterAll,
  BeforeAll,
} from "@wdio/cucumber-framework";

import { browser, $ } from "@wdio/globals";

import LoginPage from "../po/pages/login.page.js";
import { should, expect, assert } from "chai";

const userEmail = "";
const userPassword = "";

Before({ tags: "@desktopResolution1" }, async function () {
  await browser.setWindowSize(1280, 720);
});

Given("I am on the sign in page trello.com", async function () {
  await LoginPage.open();
  await LoginPage.navigateToLoginForm();
});

When("I enter valid credentials", async function () {
  await LoginPage.setUserName(userEmail);
  await LoginPage.continuesToSetPassword();
  await LoginPage.setPassword(userPassword);
});

When("I click the sign in button", async function () {
  await LoginPage.submit();
});

Then("I should be redirected to my account dashboard", async function () {
  const logoDiv = await LoginPage.getLogoDiv();
  const hrefBoardsText = await logoDiv.getText();
  assert.equal(hrefBoardsText, "Boards");
});
