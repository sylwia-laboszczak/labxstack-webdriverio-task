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
const listTitle = "Doing sth";
var workingShould = should();
const defaultExpectWaitTimout = 1000;

Before({ tags: "@desktopResolution5" }, async function () {
  await browser.setWindowSize(1280, 720);
  boardTitle = `My board (${browser.capabilities.browserName})`;
  await LoginPage.login(userEmail, userPassword);
});

After({ tags: "@desktopResolution5" }, async function () {
  await BoardPage.clickOpenBoardsLink();
  await BoardPage.deleteByBoardName(boardTitle);
});

Given("I am logged in to Trello 5", async function () {
  const logoDiv = await LoginPage.getLogoDiv();
  const hrefBoardsText = await logoDiv.getText();
  assert.equal(hrefBoardsText, "Boards");

  await BoardPage.open();
});

When("I click the “Add a list…” button", async function () {
  await BoardPage.createBoard(boardTitle);
});

When("I enter the list title as My List", async function () {
  await BoardPage.createList(listTitle);
});

Then(
  "I should see the new tile on the board representing my new list",
  async function () {
    await browser.pause(defaultExpectWaitTimout);
    const createdListTitle = await BoardPage.getCreatedListHeader();
    const listTextCreated = await createdListTitle.getText();

    expect(listTextCreated).to.equal(listTitle);
  }
);
