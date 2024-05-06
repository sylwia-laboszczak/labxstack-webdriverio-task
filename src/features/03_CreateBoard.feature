@desktopResolution3
Feature: Create Board
As a user
I want to create a board
So that I can organize my tasks

Scenario: Creating new board
    Given I am logged in to Trello 3 
    When I click the ‘Create Board’ button
    And I enter the board title as "My Board"
    And I click the ‘Create’ button
    Then I should be redirected to the new board
