// packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./utils/generateHTML');

// profile variables
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const teamArray = [];

// array of questions for user input
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the manager?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('You must enter the name of the manager');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's ID?",
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('You must enter the ID');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?",
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('You must enter an email address');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'office',
            message: "What is the manager's office number?",
            validate: officeInput => {
                if (officeInput) {
                    return true;
                } else {
                    console.log('You must enter the office number');
                    return false;
                }
            }
        }
    ])
    .then(managerInput => {
        const { name, id, email, office } = managerInput;
        const manager = new Manager (name, id, email, office);

        teamArray.push(manager);
        console.log(manager);
    })
};