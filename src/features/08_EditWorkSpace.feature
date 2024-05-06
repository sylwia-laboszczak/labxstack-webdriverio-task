
@desktopResolution8

Feature: Edit workspace
As a user 
I want to edit the workspace
So that I can update the details

Scenario: Change workspace visibility to Public
    Given I am logged in to Trello 8
    And I click on the selected workspace 
    And I click on the “Workspace settings” button
    And from the dropdown list I select “Workspace settings”
    When I change visibility from Private to Public
    Then I should see the updated public visibility workspace 

Scenario: Change workspace visibility to Private
    Given I am on workspace page
    And I click on the selected workspace 
    And I click on the “Workspace settings” button
    And from the dropdown list I select “Workspace settings”
    When I change visibility from Public to Private
    Then I should see the updated private visibility workspace 


