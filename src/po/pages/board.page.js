import Page from "./page.js";
import { browser, $ } from "@wdio/globals";
import { should, expect, assert } from "chai";

class BoardPage extends Page {
  async open() {
    await super.open("https://trello.com/u/testeronilab/boards");
  }

  async clickCreateMenu() {
    const createBtn = await $(
      'button[data-testid="header-create-menu-button"]'
    );
    await this.waitAndClick(createBtn);
  }

  async clickCreateBoard() {
    const createBoardBtn = await $(
      'button[data-testid="header-create-board-button"]'
    );
    await createBoardBtn.waitForDisplayed({ timeout: 3000 });
    await this.waitAndClick(createBoardBtn);
  }

  async setBordTitle(boardTitle) {
    const boardTitleInput = await $(
      'input[data-testid="create-board-title-input"]'
    );
    await boardTitleInput.waitForDisplayed({ timeout: 3000 });
    await boardTitleInput.setValue(boardTitle);
  }

  async createBoardSubmitBtn() {
    const createBoardSubmitBtn = await $(
      'button[data-testid="create-board-submit-button"]'
    );
    await this.waitAndClick(createBoardSubmitBtn);
  }

  async searchBoardBtn() {
    const boardsBtn = await $('a[data-testid="open-boards-link"]');
    await this.waitAndClick(boardsBtn);
  }

  async searchInputBtn() {
    const searchInputBtn = await $('nav span[aria-label="search"]');
    await this.waitAndClick(searchInputBtn);
  }

  async setBoardInput(boardTitle) {
    const searchInput = await $('input[data-test-id="search-dialog-input"]');
    await searchInput.waitForDisplayed({ timeout: 3000 });
    await searchInput.setValue(boardTitle);
  }

  async addCardBtn() {
    let addCardBtn = await $(
      'ol#board li:last-of-type button[data-testid="list-add-card-button"]'
    );
    await this.waitAndClick(addCardBtn);
    addCardBtn = await $(
      'ol#board li:last-of-type button[data-testid="list-add-card-button"]'
    );
    await this.waitAndClick(addCardBtn);
  }

  async againAddCardBtn() {
    let againAddCardToListBtn = await $(
      'ol#board li:last-of-type button[data-testid="list-card-composer-add-card-button"]'
    );
    await this.waitAndClick(againAddCardToListBtn);
  }

  async filterCardBtn() {
    const filtersCardBtn = await $(
      'button[data-testid="filter-popover-button"]'
    );
    await this.waitAndClick(filtersCardBtn);
  }

  async setFilterCardSearchInput(taskNameToFilterBy) {
    const filterCardSearchInput = await $(
      'input[aria-placeholder*="Enter a keyword"]'
    );
    await filterCardSearchInput.waitForDisplayed({ timeout: 3000 });
    await filterCardSearchInput.setValue(taskNameToFilterBy);
  }

  async fillCardWithText(cardName) {
    const cardTitleInput = await $(
      'ol#board li:nth-child(4) textarea[data-testid="list-card-composer-textarea"]'
    );
    await cardTitleInput.waitForDisplayed({ timeout: 5000 });
    await cardTitleInput.setValue(cardName);
  }

  async createBoard(boardName) {
    const createBtn = await $(
      'button[data-testid="header-create-menu-button"]'
    );
    await this.waitAndClick(createBtn);

    const createBoardBtn = await $(
      'button[data-testid="header-create-board-button"]'
    );
    await createBoardBtn.waitForDisplayed({ timeout: 3000 });
    await this.waitAndClick(createBoardBtn);

    const boardTitleInput = await $(
      'input[data-testid="create-board-title-input"]'
    );
    await boardTitleInput.waitForDisplayed({ timeout: 3000 });
    await boardTitleInput.setValue(boardName);
    const createBoardSubmitBtn = await $(
      'button[data-testid="create-board-submit-button"]'
    );
    await this.waitAndClick(createBoardSubmitBtn);

    const createdBoardTitle = await $('h1[data-testid="board-name-display"]');

    await browser.pause(1000);
    const innerText7 = await createdBoardTitle.getText();
    expect(innerText7).to.equal(boardName);
  }

  async deleteByBoardName(boardName) {
    const workspacesNavBtn = await $(
      'button[data-testid="workspace-switcher"]'
    );
    await this.waitAndClick(workspacesNavBtn);

    const yourWorkspacesNavBtn = await $(
      'ul[data-testid="workspace-switcher-popover"] ul:last-child li'
    );
    await this.waitAndClick(yourWorkspacesNavBtn);

    const dropDown1Item = await $(
      `ul.boards-page-board-section-list li div[title*="${boardName}"]`
    );
    await this.waitAndClick(dropDown1Item);

    const dotsIconBtn = await $(
      'div.board-header span[data-testid="OverflowMenuHorizontalIcon"]'
    );
    await this.waitAndClick(dotsIconBtn);

    const closeBoardBtn = await $(
      "ul.board-menu-navigation > li.board-menu-navigation-item:last-child"
    );
    await this.waitAndClick(closeBoardBtn);

    const confirmCloseBtn = await $('div.pop-over input[value="Close"]');
    await this.waitAndClick(confirmCloseBtn);

    // const permanentlyDeleteBtn = await $('button[data-testid="close-board-delete-board-button"]');
    // await this.waitAndClick(permanentlyDeleteBtn);

    // const confirmPermanentlyDeleteBtn = await $('button[data-testid="close-board-delete-board-confirm-button"]');
    // await this.waitAndClick(confirmPermanentlyDeleteBtn)

    // const workspacesNavBtn = await $('button[data-testid="workspace-switcher"]');
    // await this.waitAndClick(workspacesNavBtn);

    // const yourWorkspacesNavBtn = await $('ul[data-testid="workspace-switcher-popover"] ul:last-child li');
    // await this.waitAndClick(yourWorkspacesNavBtn);

    await browser.pause(1000);
    const emptyBoardsInfo = await $(
      'div[data-testid="boards-list-empty-state"] p'
    );
    const innerText3 = await emptyBoardsInfo.getText();
    expect(innerText3).to.equal(
      "You don’t have any boards in this Workspace yet. Boards you create or join will show up here."
    );

    // const returnToBoardsBtn = await $('a[data-testid="open-boards-link"]');
    // await this.waitAndClick(returnToBoardsBtn);

    await browser.pause(2000);
  }

  async createList(listName) {
    const addAnotherListBtn = await $(
      'button[data-testid="list-composer-button"]'
    );
    await this.waitAndClick(addAnotherListBtn);

    const inputlistTitle = await $(
      'ol#board textarea[name="Enter list title…"]'
    );
    await inputlistTitle.waitForDisplayed({ timeout: 5000 });
    await inputlistTitle.setValue(listName);

    const addListBtn = await $(
      'button[data-testid="list-composer-add-list-button"]'
    );
    await this.waitAndClick(addListBtn);
  }

  async getCreatedListTitle() {
    return await $("ol#board li:last-of-type ol li:nth-child(2)");
  }

  async getFirstCreatedListTitle() {
    return await $("ol#board li:last-of-type ol li:first-child");
  }

  async getCreatedListHeader() {
    return await $("ol#board li:last-of-type h2");
  }



  async clickOpenBoardsLink(){
    const boardsAgainBtn = await $('a[data-testid="open-boards-link"]');
    await this.waitAndClick(boardsAgainBtn);
  }


  async getSearchBoardByTitle(boardTitle){
   return await $(
      `div[data-testid="trello-hover-preview-popper-container"] span[name="${boardTitle}"]`
    );
  }


  async getDisplayedBoardName(){
  return  await $('h1[data-testid="board-name-display"]');
  }

 
}

export default new BoardPage();
