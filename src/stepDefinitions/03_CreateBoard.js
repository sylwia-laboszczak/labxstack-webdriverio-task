import {
  After,
  Before,
  BeforeAll,
  Given,
  Then,
  When,
} from "@wdio/cucumber-framework";
import { should, expect, assert } from "chai";
import { browser } from "@wdio/globals";
import BoardPage from "../po/pages/board.page.js";
import LoginPage from "../po/pages/login.page.js";
const userEmail = "";
const userPassword = "";
let boardTitle = "My board";
var workingShould = should();
const defaultExpectWaitTimout = 1000;

Before({ tags: "@desktopResolution3" }, async function () {
  await browser.setWindowSize(1280, 720);
  await LoginPage.login(userEmail, userPassword);
  const logoDiv = await LoginPage.getLogoDiv();
  const hrefBoardsText = await logoDiv.getText();
  assert.equal(hrefBoardsText, "Boards");
});

After({ tags: "@desktopResolution3" }, async function () {
  await BoardPage.deleteByBoardName(boardTitle);
});

Given("I am logged in to Trello 3", async function () {

  await BoardPage.open();
});

When("I click the ‘Create Board’ button", async function () {
  await BoardPage.clickCreateMenu();
  await BoardPage.clickCreateBoard();
});

When("I enter the board title as {string}", async function (string) {
  await BoardPage.setBordTitle(boardTitle);
});

When("I click the ‘Create’ button", async function () {
  await BoardPage.createBoardSubmitBtn();
});

Then("I should be redirected to the new board", async function () {
  await browser.pause(defaultExpectWaitTimout);
  const createdBoardTitle = await BoardPage.getDisplayedBoardName();
  const headeBoardText = await createdBoardTitle.getText();
  expect(headeBoardText).to.equal(boardTitle);
});
