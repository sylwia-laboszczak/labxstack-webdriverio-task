import Page from "./page.js";
import { browser, $ } from "@wdio/globals";

class BioPage extends Page {
  async open() {
    await super.open("https://trello.com/u/testeronilab/boards");
    const iconBtn = await $("div[data-testid=\"header-member-menu-avatar\"]");
    await this.waitAndClick(iconBtn);
  }

  async editProfileInfo() {
    const profileBtn = await $("a[data-testid=\"account-menu-profile\"]");
    await profileBtn.waitForDisplayed({ timeout: 3000 });
    await this.waitAndClick(profileBtn);
  }

  async setBioMsg(expectedBioMsg) {
    const bioInput = await $("textarea#bio");
    await bioInput.waitForDisplayed({ timeout: 3000 });
    await bioInput.setValue(expectedBioMsg);
  }

  async submitBtn() {
    const loginSubmitBtn = await $("button[type=\"submit\"]");
    await this.waitAndClick(loginSubmitBtn);
  }

  async verifyBioMsg(expectedBioMsg) {
    await browser.pause(5000);
    const updatedBioInput = await $("textarea#bio");
    const idBioText = await updatedBioInput.getText();
    idBioText.should.equal(expectedBioMsg);
  }

  async getEditToastMsg() {
    return await $("div[role=\"alert\"][tabindex=\"0\"]");
  }
}

export default new BioPage();
