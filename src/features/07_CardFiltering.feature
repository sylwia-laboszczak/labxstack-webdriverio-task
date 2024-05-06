@desktopResolution7

Feature: Card filtering
As a user 
I want to filter the cards
So that I can find the card that I need

Scenario: Card filtering
 Given Im logged into the Trello platform 
 And a new board is created
 And a list is created
 And at least one card is created 
 When I click “Filters” button 
 And type card title in the keyword field 
 Then the card should be displayed
