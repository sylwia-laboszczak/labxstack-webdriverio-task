@desktopResolution2
Feature: Editing profile
As a user 
I want to change my profile info
So that I can manage my personal information

Scenario: Edit the profile
    Given I am on the my board page
    When I click on my profile icon
    And click “Edit profile info” button
    And provide description into bio input field
    And click “Save” button 
    Then I should see notification with title “Save”
    And I should see expected Bio Msg

