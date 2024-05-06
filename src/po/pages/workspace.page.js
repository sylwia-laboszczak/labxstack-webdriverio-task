import Page from "./page.js";
import { browser, $ } from "@wdio/globals";
import { should, expect, assert } from "chai";

class WorkspacePage extends Page {
  async open() {
    await super.open("https://trello.com/u/testeronilab/boards");
  }

  async openWorkspace() {
    const dropDownTrelloWorkspace = await $(
      'li[data-testid*="home-team-tab-section"]'
    );
    await this.waitAndClick(dropDownTrelloWorkspace);
  }

  async openDropdown() {
    const dropdownSettingsBtn = await $(
      'a[data-testid="home-team-settings-tab"]'
    );
    await this.waitAndClick(dropdownSettingsBtn);
  }

  async changeWorkspace() {
    const workSpaceChangeBtn = await $(
      ".header-settings ~ .js-react-root:nth-of-type(2) button"
    );
    await this.waitAndClick(workSpaceChangeBtn);
  }

  async changeWorkspaceVisibilityToPublic() {
    const workSpaceVisibilityDropDown = await $(
      'div[data-testid="workspace-settings-visibility-popover-content"] ul li:last-child button'
    );
    await this.waitAndClick(workSpaceVisibilityDropDown);
  }

  async changeWorkSpaceVisibilityToPrivate() {
    const workSpaceVisibilityDropDown = await $(
      'div[data-testid="workspace-settings-visibility-popover-content"] ul li:first-child button'
    );
    await this.waitAndClick(workSpaceVisibilityDropDown);
  }

  async getVisibilityTypeText() {
    return await $(
      ".header-settings ~ .js-react-root:nth-of-type(2) p"
    );
  }
}

export default new WorkspacePage();
