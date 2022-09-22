const { log } = require('console');
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');

const generatePage = require('./src/generatePage');
const employeeArr = [];

const questions = [
    {
        type: 'list',
        name: 'role',
        message: 'Please indicate the role of the employee below.',
        choices: ['Manager','Engineer','Intern']
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
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter the office number of the manager.',
        when:(officeNumberInput) => officeNumberInput.role ==='Manager',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Please enter the GitHub username for the employee.',
        when:(githubInput) => githubInput.role ==='Engineer', 
      },
      {
        type: 'input',
        name: 'school',
        message: 'Please enter the name of the interns school.',
        when:(schoolInput) => schoolInput.role ==='Intern', 
      },
      {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to enter another employee?',
        default: false
      }
];

   // Add new employee
const promptEmployee = ()=>{
    console.log('Please build your team');

      return inquirer.prompt(questions)
      .then(employeeData => {
          let {role, name, id, email, github, school, officeNumber} = employeeData;
          let employee; 
        if (role === 'Manager'){ 
           employee = new Manager(name, id, email, officeNumber);
        }
        if (role === 'Engineer'){ 
            employee = new Engineer(name, id, email, github)
        }
        if (role === 'Intern'){ 
             employee = new Intern(name, id, email, school)
        }
        employeeArr.push(employee); 

        if (employeeData.confirmAddEmployee) {
          return promptEmployee(employeeArr);
        } else {
          return employeeArr; 
        }
      })
    };
const writeFile = fileContent => {
      fs.writeFile('./dist/index.html', fileContent, err => {
        if (err) {
          console.log(err);
          return;
        }
  
        else{

          console.log( 'File created!');
        }
      });
    };

promptEmployee().then(employeeArr =>{
    return generatePage(employeeArr);
}).then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
    console.log(err);
  });  