const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const promptQs = require("./lib/promptQs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeesArr = [];
let id = 0

function inputEmp () {
    id ++;
    inquirer
        .prompt(promptQs)
        .then((res) => {
            if (res.titleInput === "Manager"){
                titleRelatedQuestion = "What is your office number?";
                empName = res.nameInput;
                empEmail = res.emailInput;
                empTitle = res.titleInput;
            } else if (res.titleInput === "Intern"){
                titleRelatedQuestion = "What school do you go to?";
                empName = res.nameInput;
                empEmail = res.emailInput;
                empTitle = res.titleInput;
            } else if (res.titleInput === "Engineer"){
                titleRelatedQuestion = "What is your Github username?";
                empName = res.nameInput;
                empEmail = res.emailInput;
                empTitle = res.titleInput;
            };
            inquirer
                .prompt([
                    {
                        name: "titlesInput",
                        type: "input",
                        message: titleRelatedQuestion
                    }
                ])
                .then((res2) => {
                    empTitles = res2.titlesInput;
                
                    switch (empTitle) {
                        case "Engineer":
                            employee = new Engineer (empName, id, empEmail, empTitles)
                            break;
                        case "Manager":
                            employee = new Manager (empName, id, empEmail, empTitles)
                            break;
                        case "Intern":
                            employee = new Intern (empName, id, empEmail, empTitles)
                            break;
                        default:
                            break;
                    }
                    employeesArr.push(employee);
                    console.log(employeesArr);
                    inputNewEmp()
                })
                .catch((error) => {
                    if (error) {console.log("You've encountered an error")}
                });
        });
};

function inputNewEmp() {
    inquirer.prompt([
    {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "addTeammate",
        default: true,
    },
    ]).then(addEmp => {
    if (addEmp.addTeammate) {
        inputEmp();
    } else {
        renderMain();
    };
    });
};

function renderMain () {
    const HTML = render(employeesArr);
    fs.writeFile(outputPath, HTML, (err) => {
        if (err) throw err;
        console.log("Wohoo, you created your page!")
    })
}

inputEmp();

