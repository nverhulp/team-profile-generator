// packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const employees = [];

// function to initialize app
function initApp() {
    startHTML();
    addMember();
}

