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
import BioPage from "../po/pages/bio.page.js";
import LoginPage from "../po/pages/login.page.js";
const userEmail = "";
const userPassword = "";
let expectedBioMsg = ""

var workingShould = should();

Before({ tags: "@desktopResolution2" }, async function () {
  await browser.setWindowSize(1280, 720);
  await LoginPage.login(userEmail,userPassword);
});

After({ tags: "@desktopResolution2" }, async function () {});

Given("I am on the my board page", async function () {

});

When("I click on my profile icon", async function () {
  await BioPage.open();
});

When("click “Edit profile info” button", async function () {
  await BioPage.editProfileInfo();
});

When("provide description into bio input field", async function () {
  expectedBioMsg = "My lucky number is: " + new Date().getMilliseconds();
  await BioPage.setBioMsg(expectedBioMsg);
});

When("click “Save” button", async function () {
  await BioPage.submitBtn();
});

Then("I should see notification with title “Save”", async function () {
  await browser.pause(5000);
  const toastMsg = await BioPage.getEditToastMsg();
  const divToastText = await toastMsg.getText();
  divToastText.should.equal("Saved");
});

Then("I should see expected Bio Msg", async function () {
  console.log(expectedBioMsg)
  await BioPage.verifyBioMsg(expectedBioMsg);
});
