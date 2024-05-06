import { After, Before, Given, Then, When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import { browser } from "@wdio/globals";
import BoardPage from "../po/pages/board.page.js";
import LoginPage from "../po/pages/login.page.js";
const userEmail = "";
const userPassword = "";
let boardTitle = "My board";
const listTitle = "Doing sth";

const defaultExpectWaitTimout = 1000;

Before({ tags: "@desktopResolution7" }, async function () {
  await browser.setWindowSize(1280, 720);
  boardTitle = `My board (${browser.capabilities.browserName})`;
  await LoginPage.login(userEmail, userPassword);
});

After({ tags: "@desktopResolution7" }, async function () {
  await BoardPage.clickOpenBoardsLink();
  await BoardPage.deleteByBoardName(boardTitle);
});

Given("Im logged into the Trello platform", async function () {
  await BoardPage.open();
});

Given("a new board is created", async function () {
  await BoardPage.createBoard(boardTitle);
});

Given("a list is created", async function () {
  await BoardPage.createList(listTitle);
});

Given("at least one card is created", async function () {
  await BoardPage.addCardBtn();
  await BoardPage.fillCardWithText("superTask1");

  await BoardPage.againAddCardBtn();
  await BoardPage.fillCardWithText("superTask2");

  await BoardPage.againAddCardBtn();
  await BoardPage.fillCardWithText("superTask3");
  await BoardPage.againAddCardBtn();
});

When("I click “Filters” button", async function () {
  await BoardPage.filterCardBtn();
});

When("type card title in the keyword field", async function () {
  await BoardPage.setFilterCardSearchInput("superTask2");
});

Then("the card should be displayed", async function () {
  const createdListTitle = await BoardPage.getCreatedListTitle();

  await browser.pause(defaultExpectWaitTimout);
  const listTaskText = await createdListTitle.getText();
  expect(listTaskText).to.equal("superTask2");
});
