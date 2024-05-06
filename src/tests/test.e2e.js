import { browser, $ } from "@wdio/globals";
import { should, expect, assert } from "chai";
import LoginPage from "../po/pages/login.page.js";
import BioPage from "../po/pages/bio.page.js";
import BoardPage from "../po/pages/board.page.js";
import WorkspacePage from "../po/pages/workspace.page.js";

var workingShould = should();

const userEmail = "";
const userPassword = "";
let boardTitle = "My board";
const listTitle = "Doing sth";
const cardTitle = "task 1";
const defaultExpectWaitTimout = 1000;

describe("My Login application", function () {
  this.retries(2);

  beforeEach(async function () {
    await browser.setWindowSize(1280, 720);
    boardTitle = `My board (${browser.capabilities.browserName})`;
  });

  // test case
  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.navigateToLoginForm();

    // execute
    await LoginPage.setUserName(userEmail);
    await LoginPage.continuesToSetPassword();
    await LoginPage.setPassword(userPassword);
    await LoginPage.submit();

    // verify
    const logoDiv = await LoginPage.getLogoDiv();
    const hrefBoardsText = await logoDiv.getText();
    assert.equal(hrefBoardsText, "Boards");
  });

  it("should edit the profile", async () => {
    // setup
    await BioPage.open();
    await BioPage.editProfileInfo();
    const expectedBioMsg =
      "My lucky number is: " + new Date().getMilliseconds();
    await BioPage.setBioMsg(expectedBioMsg);
    // execute
    await BioPage.submitBtn();
    // verify
    await browser.pause(5000);
    const toastMsg = await BioPage.getEditToastMsg();
    const divToastText = await toastMsg.getText();
    divToastText.should.equal("Saved");
    await BioPage.verifyBioMsg(expectedBioMsg);
  });

  it("should create a board", async () => {
    try {
      // setup

      await BoardPage.open();
      await BoardPage.clickCreateMenu();
      await BoardPage.clickCreateBoard();
      await BoardPage.setBordTitle(boardTitle);

      // execute
      await BoardPage.createBoardSubmitBtn();

      // verify
      await browser.pause(defaultExpectWaitTimout);
      const createdBoardTitle = await BoardPage.getDisplayedBoardName();
      const headeBoardText = await createdBoardTitle.getText();
      expect(headeBoardText).to.equal(boardTitle);
    } finally {
      //delete board
      await BoardPage.deleteByBoardName(boardTitle);
    }
  });

  it("should search a board", async () => {
    try {
      // setup
      await BoardPage.open();
      await BoardPage.createBoard(boardTitle);

      // execute
      await BoardPage.searchBoardBtn();
      await BoardPage.searchInputBtn();
      await BoardPage.setBoardInput(boardTitle);

      // verify
      await browser.pause(10000);
      const searchBoardTitleInput = await BoardPage.getSearchBoardByTitle(boardTitle);
      expect(searchBoardTitleInput).to.exist;
    } finally {
      //delete board
     
      await BoardPage.clickOpenBoardsLink();
      await BoardPage.deleteByBoardName(boardTitle);
    }
  });

  it("should add list to board", async () => {
    try {
      // setup

      await BoardPage.open();
      await BoardPage.createBoard(boardTitle);

      // execute
      await BoardPage.createList(listTitle);

      // verify
      await browser.pause(defaultExpectWaitTimout);
      const createdListTitle = await BoardPage.getCreatedListHeader();
      const listTextCreated = await createdListTitle.getText();
      expect(listTextCreated).to.equal(listTitle);
    } finally {
      //delete board
      await BoardPage.deleteByBoardName(boardTitle);
    }
  });

  it("should create a card into the list ", async () => {
    try {
      // setup

      await BoardPage.open();
      await BoardPage.createBoard(boardTitle);
      await BoardPage.createList(listTitle);

      // execute
      await BoardPage.addCardBtn();

      await  BoardPage.fillCardWithText(cardTitle);

      await BoardPage.againAddCardBtn();

      // verify
      const createdListTitle = await BoardPage.getFirstCreatedListTitle();

      await browser.pause(defaultExpectWaitTimout);
      const listTilteText = await createdListTitle.getText();
      expect(listTilteText).to.equal(cardTitle);
    } finally {
      //delete board
      await BoardPage.deleteByBoardName(boardTitle);
    }
  });

  it("should filter the card name  ", async () => {
    try {
      // setup
      await BoardPage.open();
      await BoardPage.createBoard(boardTitle);
      await BoardPage.createList(listTitle);

      await BoardPage.addCardBtn();
      await BoardPage.fillCardWithText("superTask1");

      await BoardPage.againAddCardBtn();
      await BoardPage.fillCardWithText("superTask2");

      await BoardPage.againAddCardBtn();
      await BoardPage.fillCardWithText("superTask3");

      await BoardPage.againAddCardBtn();

      // execute
      await BoardPage.filterCardBtn();

      await BoardPage.setFilterCardSearchInput("superTask2");

      // verify
      const createdListTitle = await BoardPage.getCreatedListTitle();

      await browser.pause(defaultExpectWaitTimout);
      const listTaskText = await createdListTitle.getText();
      expect(listTaskText).to.equal("superTask2");
    } finally {
      // delete board
      await BoardPage.deleteByBoardName(boardTitle);
    }
  });

  it("should change the workspace visibility to Public", async () => {
    // setup
    await WorkspacePage.open();

    await WorkspacePage.openWorkspace();
    await WorkspacePage.openDropdown();

    // execute
    await WorkspacePage.changeWorkspace();

    await WorkspacePage.changeWorkspaceVisibilityToPublic();

    // verify
    const expectedVisibilityText =
      "Public - This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards.";
      const visibilityTypeText = await WorkspacePage.getVisibilityTypeText();

    await browser.pause(defaultExpectWaitTimout);
    const visibilityTextWorkspace = await visibilityTypeText.getText();
    expect(visibilityTextWorkspace).to.equal(expectedVisibilityText);
  });

  it("should change the workspace visibility to Private", async () => {
    // setup
    await WorkspacePage.open();
    await WorkspacePage.openWorkspace();
    await WorkspacePage.openDropdown();

    // execute

    await WorkspacePage.changeWorkspace();

    await WorkspacePage.changeWorkSpaceVisibilityToPrivate();

    // verify
    const expectedVisibilityText =
      "Private - This Workspace is private. It's not indexed or visible to those outside the Workspace.";
    const visibilityTypeText = await WorkspacePage.getVisibilityTypeText();
    await browser.pause(defaultExpectWaitTimout);
    const innerText7 = await visibilityTypeText.getText();
    expect(innerText7).to.equal(expectedVisibilityText);
  });


});
