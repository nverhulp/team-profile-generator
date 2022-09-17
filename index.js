// packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./utils/generateHTML');

// profile variables
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const teamArray = [];

// array of questions for manager
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
            const manager = new Manager(name, id, email, office);

            teamArray.push(manager);
            console.log(manager);
        })
};

// array of questions for employees
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of your employee?',
            choices: ['Engineer', 'Intern'];
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('You must enter the name of the employee');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's ID?",
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
            message: "What is the employee's email?",
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
            // only for engineers
            type: 'input',
            name: 'github',
            message: "What is the employee's GitHub username?",
            when: (input) => input.role === "Engineer",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('You must enter the username');
                    return false;
                }
            }
        },
        {
            // only for interns
            type: 'input',
            name: 'school',
            message: "What is the name of the intern's school?",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                return true;
            } else {
                console.log("You must enter the school name");
                return false;
            }
        },
        // ask if user wants to add more members
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
        .then(employeeData => {
            let { name, id, email, role, github, school, confirm } = employeeData;
            let employee;

            if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);
                console.log(employee);
            } else if (role === "Intern") {
                employee = new Intern(name, id, email, school);
                console.log(employee);
            }
            teamArray.push(employee);

            if (confirm) {
                return addEmployee(teamArray);
            } else {
                return teamArray;
            }
        })
};

// function to create HTML page file
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Your team profile has been created');
        }
    })
};

addManager()
.then(addEmployee)
.then(teamArray => {
    return generateHTML(teamArray);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.catch(err => {
    console.log(err);
})