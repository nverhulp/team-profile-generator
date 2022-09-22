// packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/pageTemplate");

// array
const teamMembers = [];
const idArray = [];

function appMenu() {

    // manager card
    function createManager() {
        console.log["Please build your team"];
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager's name?",
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's ID?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?",
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?",
            }
        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            fs.createReadStream();
        });
    }
    
    // create team
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"]
            }
        ]);
    }

    // engineer card
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's ID?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "What is the engineer's GitHub profile?",
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    // intern card
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's ID?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
            },
            {
                type: "input",
                name: "internSchoolName",
                message: "What is the intern's school name?",
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchoolName);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }

    // build team
    function buildTeam() {
        // create output directory if output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();
    createEngineer();
    createIntern();
}

appMenu();