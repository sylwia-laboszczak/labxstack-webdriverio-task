import { Before, Given, Then, When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import { browser } from "@wdio/globals";

import LoginPage from "../po/pages/login.page.js";
import WorkspacePage from "../po/pages/workspace.page.js";
const userEmail = "";
const userPassword = "";

const defaultExpectWaitTimout = 10000;

Before({ tags: "@desktopResolution8" }, async function () {
  await browser.setWindowSize(1280, 720);
});

Given("I am logged in to Trello 8", async function () {
  await LoginPage.login(userEmail, userPassword);
});

Given("I am on workspace page", async function () {
  await WorkspacePage.open();
});

Given("I click on the selected workspace", async function () {
  await WorkspacePage.openWorkspace();
});

Given("I click on the “Workspace settings” button", async function () {
  await WorkspacePage.openDropdown();
});

Given(
  "from the dropdown list I select “Workspace settings”",
  async function () {
    await WorkspacePage.changeWorkspace();
  },
);

When("I change visibility from Private to Public", async function () {
  await WorkspacePage.changeWorkspaceVisibilityToPublic();
});

Then("I should see the updated public visibility workspace", async function () {
  const expectedVisibilityText =
    "Public - This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards.";
  const visibilityTypeText = await WorkspacePage.getVisibilityTypeText();

  await browser.pause(defaultExpectWaitTimout);
  const visibilityTextWorkspace = await visibilityTypeText.getText();
  expect(visibilityTextWorkspace).to.equal(expectedVisibilityText);
});

When("I change visibility from Public to Private", async function () {
  await WorkspacePage.changeWorkSpaceVisibilityToPrivate();
});

Then(
  "I should see the updated private visibility workspace",
  async function () {
    const expectedVisibilityText =
      "Private - This Workspace is private. It's not indexed or visible to those outside the Workspace.";
    const visibilityTypeText = await WorkspacePage.getVisibilityTypeText();
    await browser.pause(defaultExpectWaitTimout);
    const innerText7 = await visibilityTypeText.getText();
    expect(innerText7).to.equal(expectedVisibilityText);
  },
);
