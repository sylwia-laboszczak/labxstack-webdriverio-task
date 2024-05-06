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
const cardTitle = "task 1";
var workingShould = should();
const defaultExpectWaitTimout = 1000;

Before({ tags: "@desktopResolution6" }, async function () {
  await browser.setWindowSize(1280, 720);
  boardTitle = `My board (${browser.capabilities.browserName})`;
  await LoginPage.login(userEmail, userPassword);
});

After({ tags: "@desktopResolution6" }, async function () {
  await BoardPage.clickOpenBoardsLink();
  await BoardPage.deleteByBoardName(boardTitle);
});

Given("Im logged in to Trello platform", async function () {
  await BoardPage.open();
});

Given("a list card called “My list” already exist", async function () {
  await BoardPage.createBoard(boardTitle);
  await BoardPage.createList(listTitle);
});

When("I click the “Add card” button", async function () {
  await BoardPage.addCardBtn();

  await BoardPage.fillCardWithText(cardTitle);

  await BoardPage.againAddCardBtn();
});

Then(
  "I see a new card with text “Enter a title for this card",
  async function () {
    const createdListTitle = await BoardPage.getFirstCreatedListTitle();

    await browser.pause(defaultExpectWaitTimout);
    const listTilteText = await createdListTitle.getText();
    expect(listTilteText).to.equal(cardTitle);
  }
);
