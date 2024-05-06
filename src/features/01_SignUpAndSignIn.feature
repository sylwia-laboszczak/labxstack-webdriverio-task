@desktopResolution1
Feature: Sign up/Sign in 
As a user
I want to sign in
So that I can access my account

Scenario: Sign up/Sign in
    Given I am on the sign in page trello.com
    When I enter valid credentials
    And I click the sign in button
    Then I should be redirected to my account dashboard
