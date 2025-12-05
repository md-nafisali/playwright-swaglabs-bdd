
Feature: Login functionality
	
	Scenario: Successful login with valid credentials
		Given the user is on login page
		When the user enters valid username and password
		And clicks on the login button
		Then the user should be redirected to the homepage
		And a welcome message should be displayed

        