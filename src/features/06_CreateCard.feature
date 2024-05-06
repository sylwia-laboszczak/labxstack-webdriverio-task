@desktopResolution6


Feature:Create a card
As a user 
I want to create a new card
So that I can store items  in one list  

Scenario: Creating a new card
 Given Im logged in to Trello platform
 And a list card called “My list” already exist
 When I click the “Add card” button 
 Then I see a new card with text “Enter a title for this card

