// link to create page
const generatePage = require('./src/generatePage');

// team/class profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// node modules/required packages
const {log} = require('console');
const inquirer = require('inquirer');
const fs = require('fs');
const teamArray = [];

// adding manager card
const addManager = () => {
  console.log('Please add your manager');
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the manager?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the ID of the manager?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the email of the manager?',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the office number of the manager?',
    }
  ]).then(managerInput => {
    const {name, id, email, officeNumber} = managerInput;
    const manager = new Manager (name, id, email, officeNumber);

    teamArray.push(manager);
  })
};

// adding engineer or intern card
const addEmployee = () => {
  console.log('Please add other team members');
  return inquirer.prompt ([
    {
      type: 'list',
        name: 'role',
        message: 'Please indicate the role of the employee below.',
        choices: ['Engineer','Intern']
    },
    {
      type: 'input',
        name: 'name',
        message: 'What is the name of the employee?',
    },
    {
      type: 'input',
        name: 'id',
        message: 'What is the ID number of the employee?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the employees email?',
    },
    // only for engineers
    {
      type: 'input',
      name: 'github',
      message: 'What is the GitHub username of the engineer?',
      when:(input) => input.role === "Engineer",
    },
    // only for interns
    {
      type: 'input',
      name: 'school',
      message: 'What is the school name of the intern?',
      when:(input) => input.role === "Intern",
    },
    // asks if user wants to add more members
    {
      type: 'confirm',
      name: 'confirmAddEmployee',
      message: 'Would you like to enter another employee?',
      default: false
    }
  ]).then(employeeData => {
    let {name, id, email, role, github, school, confirmAddEmployee} = employeeData;
    let employee;
    
    // if user chooses engineer
    if (role === "Engineer") {
      employee = new Engineer (name, id, email, github);
    
    // if user chooses intern
    } else if (role === "Intern") {
      employee = new Intern (name, id, email, school);

    }
    teamArray.push(employee);
    if (confirmAddEmployee) {
      return addEmployee(teamArray);

    } else {
      return teamArray;
    }
  })
};

// generate page using file system
const writeFile = data => {
  fs.writeFile('./dist/index.html', data, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('File created')
    }
  })
};

addManager()
  .then(addEmployee)
  .then(teamArray => {
    return generatePage(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
    console.log(err);
  });