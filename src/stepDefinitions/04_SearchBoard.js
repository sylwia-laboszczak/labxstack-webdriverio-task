import { After, Before, Given, Then, When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import { browser } from "@wdio/globals";
import BoardPage from "../po/pages/board.page.js";
import LoginPage from "../po/pages/login.page.js";
const userEmail = "";
const userPassword = "";
let boardTitle = "My board";

Before({ tags: "@desktopResolution4" }, async function () {
  await browser.setWindowSize(1280, 720);
  await LoginPage.login(userEmail, userPassword);
});

After({ tags: "@desktopResolution4" }, async function () {
  await BoardPage.clickOpenBoardsLink();
  await BoardPage.deleteByBoardName(boardTitle);
});

Given("I am logged in to Trello 4", async function () {
  await BoardPage.open();
});

When("I enter the board title as “My Board”", async function () {
  await BoardPage.createBoard(boardTitle);
});

When("I click the search input", async function () {
  await BoardPage.searchBoardBtn();
  await BoardPage.searchInputBtn();
  await BoardPage.setBoardInput(boardTitle);
});

Then("I should see a list of boards that match my search", async function () {
  await browser.pause(8000);
  const searchBoardTitleInput =
    await BoardPage.getSearchBoardByTitle(boardTitle);
  expect(searchBoardTitleInput).to.exist;
});
