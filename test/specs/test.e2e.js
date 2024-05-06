import { expect, browser, $ } from "@wdio/globals";


const pageUrl="https://trello.com/home";
const userEmail="";
const userPassword="";
const boardTitle = "My task to do";
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

  async function deleteByBoardName(boardName) {
    const boardsBtn = await $('a[data-testid="open-boards-link"]');
    await waitAndClick(boardsBtn);

    // const showMoreBtn = await $('button[data-testid="boards-list-show-more-button"]');
    // await waitAndClick(showMoreBtn);
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
    await searchBtn.waitForDisplayed({ timeout: 10000 });
    await searchBtn.waitForClickable({ timeout: 3000 });
    await searchBtn.click();
  }
});
