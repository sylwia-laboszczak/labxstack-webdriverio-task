import { expect, browser, $ } from "@wdio/globals";
import { Key } from 'webdriverio'


const pageUrl="https://trello.com/home";
const userEmail="";
const userPassword="";
const boardTitle = "My task to do";
const listTitle = "Doing sth";
const defaultVerifyTimeout = 5000;


describe("My Login application", () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  it("should login with valid credentials", async () => {
    // setup
    await browser.url(pageUrl);
    const loginBtn = await $('a[data-uuid*="_login"]');
    await waitAndClick(loginBtn);

    // execute
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

    // verify
    const logoDiv = await $('a[href*="/boards"]');
    await waitAndAssertText(logoDiv, "Boards");
  });


  it("should edit the profile", async () => {
    // setup
    const expectedBioMsg =
      "My lucky number is: " + new Date().getMilliseconds();
    await browser.url(boardPageUrl);
    const iconBtn = await $('div[data-testid="header-member-menu-avatar"]');
    await waitAndClick(iconBtn);

    const profileBtn = await $('a[data-testid="account-menu-profile"]');
    await profileBtn.waitForDisplayed({ timeout: 3000 });
    await waitAndClick(profileBtn);

    const bioInput = await $("textarea#bio");
    await bioInput.waitForDisplayed({ timeout: 3000 });
    await bioInput.setValue(expectedBioMsg);

    // execute
    const loginSubmitBtn = await $('button[type="submit"]');
    await waitAndClick(loginSubmitBtn);

    // // verify
    const toastMsg = await $('div[role="alert"][tabindex="0"]');
    await waitAndAssertText(toastMsg, "Saved");

    const updatedBioInput = await $("textarea#bio");
    await waitAndAssertText(updatedBioInput, expectedBioMsg);
  });

  it("should create a board", async () => {
    try {
      // setup
      await browser.url(boardPageUrl);
      const createBtn = await $(
        'button[data-testid="header-create-menu-button"]'
      );
      await waitAndClick(createBtn);

      const createBoardBtn = await $(
        'button[data-testid="header-create-board-button"]'
      );
      await createBoardBtn.waitForDisplayed({ timeout: 3000 });
      await waitAndClick(createBoardBtn);

      const boardTitleInput = await $(
        'input[data-testid="create-board-title-input"]'
      );
      await boardTitleInput.waitForDisplayed({ timeout: 3000 });
      await boardTitleInput.setValue(boardTitle);

      // execute
      const createBoardSubmitBtn = await $(
        'button[data-testid="create-board-submit-button"]'
      );
      await waitAndClick(createBoardSubmitBtn);

      // verify
      const createdBoardTitle = await $('h1[data-testid="board-name-display"]');
      await waitAndAssertText(createdBoardTitle, boardTitle);
    } finally {
      //delete board
      await deleteByBoardName(boardTitle);
    }
  });

  it("should search a board", async () => {
    try {
      // setup
      await browser.url(boardPageUrl);
      await createBoard(boardTitle);

      // execute
      const boardsBtn = await $('a[data-testid="open-boards-link"]');
      await waitAndClick(boardsBtn);

      const searchInputBtn = await $('nav span[aria-label="search"]');
      await waitAndClick(searchInputBtn);

      const searchInput = await $('input[data-test-id="search-dialog-input"]');
      await searchInput.waitForDisplayed({ timeout: 3000 });
      await searchInput.setValue(boardTitle);

      // verify
      const searchBordTitleInput = await $(
        `div[data-testid="trello-hover-preview-popper-container"] span[name="${boardTitle}"]`
      );
      await searchBordTitleInput.waitForDisplayed({ timeout: 20000 });
    } finally {
      //delete board
      await deleteByBoardName(boardTitle);
    }
  });

  it("should search a board", async () => {
    try {
      // setup
      await browser.url(boardPageUrl);
      await createBoard(boardTitle);

      // execute
      await createList(listTitle);

      // verify
      const createdListTitle = await $('ol#board li:nth-child(4) h2');
      await waitAndAssertText(createdListTitle, listTitle);
    } finally {
      //delete board
      await deleteByBoardName(boardTitle);
    }
  });

  it("should create a card into the list ", async () => {
    try {
      // setup
      await browser.url(boardPageUrl);
      await createBoard(boardTitle);
      await createList(listTitle);

      // execute
      const addCartBtn = await $('ol#board li:nth-child(4) button[data-testid="list-add-card-button"' );
      await waitAndClick(addCartBtn);

      const cardTitleInput = await $('ol#board li:nth-child(4) textarea[data-testid="list-card-composer-textarea"]');
      await cardTitleInput.waitForDisplayed({ timeout: 5000 });
      await cardTitleInput.setValue(listTitle);

      const addCardToListBtn = await $('ol#board li:nth-child(4) button[data-testid="list-card-composer-add-card-button"]');
      await waitAndClick(addCardToListBtn);

      // a
      const againAddCartBtn = await $('ol#board li:nth-child(4) button[data-testid="list-add-card-button"' );
      await waitAndClick(againAddCartBtn);
      const againAddCardToListBtn = await $('ol#board li:nth-child(4) button[data-testid="list-card-composer-add-card-button"]');
      await waitAndClick(againAddCardToListBtn);


      // verify
      const createdListTitle = await $('ol#board li:nth-child(4) ol li:first-child');
      await waitAndAssertText(createdListTitle, listTitle);
    } finally {
      //delete board
      await deleteByBoardName(boardTitle);
    }
  });






  async function createList(listName) {
    const addAnotherListBtn = await $('button[data-testid="list-composer-button"]');
    await waitAndClick(addAnotherListBtn);

    const inputlistTitle = await $('ol#board textarea[name="Enter list title…"]');
    await inputlistTitle.waitForDisplayed({ timeout: 5000 });
    await inputlistTitle.setValue(listName);

    const addListBtn = await $('button[data-testid="list-composer-add-list-button"]');
    await waitAndClick(addListBtn);
  }



  async function createBoard(boardName) {
    const createBtn = await $(
      'button[data-testid="header-create-menu-button"]'
    );
    await waitAndClick(createBtn);

    const createBoardBtn = await $(
      'button[data-testid="header-create-board-button"]'
    );
    await createBoardBtn.waitForDisplayed({ timeout: 3000 });
    await waitAndClick(createBoardBtn);

    const boardTitleInput = await $(
      'input[data-testid="create-board-title-input"]'
    );
    await boardTitleInput.waitForDisplayed({ timeout: 3000 });
    await boardTitleInput.setValue(boardName);
    const createBoardSubmitBtn = await $(
      'button[data-testid="create-board-submit-button"]'
    );
    await waitAndClick(createBoardSubmitBtn);

    const createdBoardTitle = await $('h1[data-testid="board-name-display"]');
    await waitAndAssertText(createdBoardTitle, boardName);
  }

  async function deleteByBoardName(boardName) {
    const boardsBtn = await $('a[data-testid="open-boards-link"]');
    await waitAndClick(boardsBtn);

    const showMoreBtn = await $(
      'button[data-testid="boards-list-show-more-button"]'
    );

    let isShowMoreBtnExisting = await showMoreBtn.isExisting();
    if (isShowMoreBtnExisting) {
      await waitAndClick(showMoreBtn);
    }

    const dropDownItem = await $(`a[title="${boardName}"]`);
    await dropDownItem.waitForDisplayed({ timeout: 10000 });
    await dropDownItem.moveTo();

    const dotsIconBtn = await $(
      `a[title="${boardName}"] + div span[data-testid="OverflowMenuHorizontalIcon"]`
    );
    await waitAndClick(dotsIconBtn);

    const closeBoardBtn = await $(`button[title="Close board"]`);
    await waitAndClick(closeBoardBtn);

    const confirmCloseBtn = await $(`button[title="Close"]`);
    await waitAndClick(confirmCloseBtn);

    const returnToBoardsBtn = await $('a[data-testid="open-boards-link"]');
    await waitAndClick(returnToBoardsBtn);

    const emptyBoardsInfo = await $(
      'div[data-testid="boards-list-empty-state"] p'
    );
    await waitAndAssertText(
      emptyBoardsInfo,
      "You don’t have any boards in this Workspace yet. Boards you create or join will show up here."
    );
  }





























  async function waitAndAssertText(element, expectedText) {
    await element.waitUntil(
      async function () {
        const innerText = await this.getText();
        return innerText === expectedText;
      },
      {
        timeout: defaultVerifyTimeout,
        timeoutMsg: "expected text to be different after 5s",
      }
    );
  }

  async function waitAndClick(searchBtn) {
    await searchBtn.waitForDisplayed({ timeout: 5000 });
    await searchBtn.waitForClickable({ timeout: 3000 });
    await searchBtn.click();
  }
});
