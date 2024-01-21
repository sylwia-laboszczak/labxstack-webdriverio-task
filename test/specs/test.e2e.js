import { expect, browser, $ } from "@wdio/globals";


const pageUrl="https://trello.com/home";
const userEmail="";
const userPassword="";
const boardPageUrl = "https://trello.com/u/testeronilab/boards";
let boardTitle = "My board";
const listTitle = "Doing sth";
const cardTitle = "task 1";
const defaultVerifyTimeout = 5000;

describe("My Login application", function () {

  this.retries(2)

  beforeEach(async () => {
    await browser.setWindowSize(1280, 720);
    boardTitle = `My board (${browser.capabilities.browserName})`
  });

  it("should login with valid credentials", async () => {
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
      await searchBordTitleInput.waitForDisplayed({ timeout: 60000 });

      const boardsAgainBtn = await $('a[data-testid="open-boards-link"]');
      await waitAndClick(boardsAgainBtn);

    } finally {
      //delete board
      await deleteByBoardName(boardTitle);
    }
  });

  it("should add list to board", async () => {
    try {
      // setup
      await browser.url(boardPageUrl);
      await createBoard(boardTitle);

      // execute
      await createList(listTitle);

      // verify
      const createdListTitle = await $("ol#board li:last-of-type h2");
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
      let addCartBtn = await $('ol#board li:last-of-type button[data-testid="list-add-card-button"]');
      await waitAndClick(addCartBtn);
      addCartBtn = await $('ol#board li:last-of-type button[data-testid="list-add-card-button"]');
      await waitAndClick(addCartBtn);

      await fillCardWithText(cardTitle);

      let againAddCardToListBtn = await $('ol#board li:last-of-type button[data-testid="list-card-composer-add-card-button"]');
      await waitAndClick(againAddCardToListBtn);

      // verify
      const createdListTitle = await $(
        "ol#board li:last-of-type ol li:first-child"
      );
      await waitAndAssertText(createdListTitle, cardTitle);
    } finally {
      //delete board
      await deleteByBoardName(boardTitle);
    }
  });

  it("should filter the card name  ", async () => {
    try {
      // setup
      await browser.url(boardPageUrl);
      await createBoard(boardTitle);
      await createList(listTitle);

      let addCartBtn = await $('ol#board li:last-of-type button[data-testid="list-add-card-button"]');
      await waitAndClick(addCartBtn);
      addCartBtn = await $('ol#board li:last-of-type button[data-testid="list-add-card-button"]');
      await waitAndClick(addCartBtn);
      await fillCardWithText("superTask1");

      let  againAddCardToListBtn = await $('ol#board li:last-of-type button[data-testid="list-card-composer-add-card-button"]');
      await waitAndClick(againAddCardToListBtn);
      await fillCardWithText("superTask2");
      againAddCardToListBtn = await $('ol#board li:last-of-type button[data-testid="list-card-composer-add-card-button"]');
      await waitAndClick(againAddCardToListBtn);
      await fillCardWithText("superTask3");
      againAddCardToListBtn = await $('ol#board li:last-of-type button[data-testid="list-card-composer-add-card-button"]');
      await waitAndClick(againAddCardToListBtn);

      // execute
      const filtersCardBtn = await $('button[data-testid="filter-popover-button"]');
      await waitAndClick(filtersCardBtn);

      const filterCardSearchInput = await $('input[aria-placeholder*="Enter a keyword"]');
      await filterCardSearchInput.waitForDisplayed({ timeout: 3000 });
      await filterCardSearchInput.setValue("superTask2");

      // verify
      const createdListTitle = await $(
        "ol#board li:last-of-type ol li:nth-child(2)"
      );
      await waitAndAssertText(createdListTitle, "superTask2");
    } finally {
      // delete board
      await deleteByBoardName(boardTitle);
    }
  });

  it("should change the workspace visibility to Public", async () => {
    // setup
    await browser.url(boardPageUrl);
    const dropDownTrelloWorkspace = await $(
      'li[data-testid*="home-team-tab-section"]'
    );
    await waitAndClick(dropDownTrelloWorkspace);
    const dropdownSettingsBtn = await $(
      'a[data-testid="home-team-settings-tab"]'
    );
    await waitAndClick(dropdownSettingsBtn);

    // execute
    const workSpaceChangeBtn = await $(
      ".header-settings ~ .js-react-root:nth-of-type(2) button"
    );
    await waitAndClick(workSpaceChangeBtn);

    const workSpaceVisibilityDropDown = await $(
      'div[data-testid="workspace-settings-visibility-popover-content"] ul li:last-child button'
    );
    await waitAndClick(workSpaceVisibilityDropDown);

    // verify
    const expectedVisibilityText =
      "Public - This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards.";
    const visibilityTypeText = await $(
      ".header-settings ~ .js-react-root:nth-of-type(2) p"
    );
    await waitAndAssertText(visibilityTypeText, expectedVisibilityText);
  });

  it("should change the workspace visibility to Private", async () => {
    // setup
    await browser.url(boardPageUrl);
    const dropDownTrelloWorkspace = await $(
      'li[data-testid*="home-team-tab-section"]'
    );
    await waitAndClick(dropDownTrelloWorkspace);
    const dropdownSettingsBtn = await $(
      'a[data-testid="home-team-settings-tab"]'
    );
    await waitAndClick(dropdownSettingsBtn);

    // execute
    const workSpaceChangeBtn = await $(
      ".header-settings ~ .js-react-root:nth-of-type(2) button"
    );
    await waitAndClick(workSpaceChangeBtn);

    const workSpaceVisibilityDropDown = await $(
      'div[data-testid="workspace-settings-visibility-popover-content"] ul li:first-child button'
    );
    await waitAndClick(workSpaceVisibilityDropDown);

    // verify
    const expectedVisibilityText =
      "Private - This Workspace is private. It's not indexed or visible to those outside the Workspace.";
    const visibilityTypeText = await $(
      ".header-settings ~ .js-react-root:nth-of-type(2) p"
    );
    await waitAndAssertText(visibilityTypeText, expectedVisibilityText);
  });

  async function fillCardWithText(cardName) {
    const cardTitleInput = await $(
      'ol#board li:nth-child(4) textarea[data-testid="list-card-composer-textarea"]'
    );
    await cardTitleInput.waitForDisplayed({ timeout: 5000 });
    await cardTitleInput.setValue(cardName);
  }

  async function createList(listName) {
    const addAnotherListBtn = await $(
      'button[data-testid="list-composer-button"]'
    );
    await waitAndClick(addAnotherListBtn);

    const inputlistTitle = await $(
      'ol#board textarea[name="Enter list title…"]'
    );
    await inputlistTitle.waitForDisplayed({ timeout: 5000 });
    await inputlistTitle.setValue(listName);

    const addListBtn = await $(
      'button[data-testid="list-composer-add-list-button"]'
    );
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
    const workspacesNavBtn = await $(
      'button[data-testid="workspace-switcher"]'
    );
    await waitAndClick(workspacesNavBtn);

    const yourWorkspacesNavBtn = await $(
      'ul[data-testid="workspace-switcher-popover"] ul:last-child li'
    );
    await waitAndClick(yourWorkspacesNavBtn);

    const dropDown1Item = await $(
      `ul.boards-page-board-section-list li div[title*="${boardName}"]`
    );
    await waitAndClick(dropDown1Item);

    const dotsIconBtn = await $(
      'div.board-header span[data-testid="OverflowMenuHorizontalIcon"]'
    );
    await waitAndClick(dotsIconBtn);

    const closeBoardBtn = await $(
      "ul.board-menu-navigation > li.board-menu-navigation-item:last-child"
    );
    await waitAndClick(closeBoardBtn);

    const confirmCloseBtn = await $('div.pop-over input[value="Close"]');
    await waitAndClick(confirmCloseBtn);

    // const permanentlyDeleteBtn = await $('button[data-testid="close-board-delete-board-button"]');
    // await waitAndClick(permanentlyDeleteBtn);

    // const confirmPermanentlyDeleteBtn = await $('button[data-testid="close-board-delete-board-confirm-button"]');
    // await waitAndClick(confirmPermanentlyDeleteBtn)

    // const workspacesNavBtn = await $('button[data-testid="workspace-switcher"]');
    // await waitAndClick(workspacesNavBtn);

    // const yourWorkspacesNavBtn = await $('ul[data-testid="workspace-switcher-popover"] ul:last-child li');
    // await waitAndClick(yourWorkspacesNavBtn);

    const emptyBoardsInfo = await $(
      'div[data-testid="boards-list-empty-state"] p'
    );
    await waitAndAssertText(
      emptyBoardsInfo,
      "You don’t have any boards in this Workspace yet. Boards you create or join will show up here."
    );

    // const returnToBoardsBtn = await $('a[data-testid="open-boards-link"]');
    // await waitAndClick(returnToBoardsBtn);

    await browser.pause(2000);
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
