@desktopResolution4
Feature: Search for a board
As a user 
I wants to search previously created boards
So that i can find the board that I need

Scenario: Successful Board Search
    Given I am logged in to Trello 4
    When I enter the board title as “My Board”
    And I click the search input
    Then I should see a list of boards that match my search
