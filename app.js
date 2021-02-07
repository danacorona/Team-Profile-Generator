const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const id = [];

function runProgram () {
    function getManager () {
        inquirer 
        .prompt ([
            {
                
                type: 'input',
                message: 'What is the managers name?',
                name: 'managerName',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return ("Please enter a name");
                }
        }, 
        {
            type: 'input',
            message: 'What is the managers employee id?',
            name: 'managerId',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter an employee id");
            }
        },
        {
            type: 'input',
            message: 'What is the managers email address?',
            name: 'managerEmail',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid email address");
            }
        },
        {
            type: 'input',
            message: 'What is the managers office number?',
            name: 'managerOfficeNumber',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid office number");
            }
        }
    ]).then ((answers) => {
        const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        id.push(answers.managerId);
        createTeamMembers();
        }) 
    }; 



    function createTeamMembers() {
        inquirer
            .prompt ([
                {
                    type: 'list',
                    message: "What is the employee's role?",
                    choices: ["Engineer", "Intern", "I dont want to add anymore team members"],
                    name:'employeeRole'
                }
            ]).then ((answers) => {
                switch (answers.employeeRole) {
                    case "Engineer" :
                        addEngineer();
                        break

                    case "Intern" :
                        addIntern();
                        break
                    
                    default :
                    buildTeam ();
                }
                });
    };

    function addEngineer () {
        inquirer
        .prompt ([
            {
                type: 'input',
                message: 'What is the Engineers name?',
                name: 'engineerName',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return ("Please enter a name");
                }
        },
        {
            type: 'input',
            message: 'What is the Engineers employee id?',
            name: 'engineerId',
            validate: answer => {
                if (id.includes(answer)) {
                    return "This Id is already taken";
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'What is the Engineers email address?',
            name: 'engineerEmail',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid email address");
            }
        },
        {
            type: 'input',
            message: 'What is the Engineers github username?',
            name: 'engineerGithub',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid username");
            }
        }
    ]).then ((answers) => {
        const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        id.push(answers.engineerId);
        createTeamMembers();
        })
    };



    function addIntern () {
        inquirer
        .prompt ([
            {
                type: 'input',
                message: 'What is the Interns name?',
                name: 'internName',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return ("Please enter a name");
                }
        },
        {
            type: 'input',
            message: 'What is the Interns employee id?',
            name: 'internId',
            validate: answer => {
                if (id.includes(answer)) {
                    return "This Id is already taken";
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'What is the Interns email address?',
            name: 'internEmail',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a valid email address");
            }
        },
        {
            type: 'input',
            message: 'What is the Interns school name?',
            name: 'internSchool',
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return ("Please enter a schoolname");
            }
        }
    ]).then ((answers) => {
        const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        id.push(answers.internId);
        createTeamMembers();
        })
    };

    

    function buildTeam () {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    };

    getManager ();
}

runProgram ();