# Team Profile Generator

## Description

Your challenge is to build a Node.js command-line application that takes in information about employees on a software engineering team and generates an HTML webpage that displays summaries for each person. Because testing is key to making code maintainable, you’ll also write unit tests for each part of your code and ensure that it passes all of them.

## Table of Contents

1. [Video Tutorial](#video-tutorial)
2. [Acceptance Criteria](#acceptance-criteria)
3. [Comments](#comments)
4. [Credits](#credits)

## Video Tutorial

https://user-images.githubusercontent.com/105401594/191876385-23864644-dfa2-4954-8648-0c14325d8daa.mp4

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address
WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab
WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated

## Comments
1. Functional and allows user input in command-line
2. Asks for manager information first
3. Allows user to add infinite number of engineers/interns
4. User input is transferred and integrated in html file
5. Information appears on deployed application/page

## Credits
1. Review session hosted by Stacy
2. Article about Javascript and generator function by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
