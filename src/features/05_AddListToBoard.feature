@desktopResolution5
Feature: Create List
As a user 
I want to create a new list 
So that I can organize my tasks 

Scenario: List Creation
    Given I am logged in to Trello 5
    When I click the “Add a list…” button
    And I enter the list title as My List
    Then I should see the new tile on the board representing my new list
