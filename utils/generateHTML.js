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

// function to add new member
function addMember() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "Enter team member's name",
    },
    {
        type: 'list',
        name: 'role',
        message: "Select team member's role",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter team member's ID",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter team member's email address",
    }])
}