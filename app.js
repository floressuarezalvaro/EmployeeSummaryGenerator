const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");

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
            console.log(res);
            let titleRelatedQuestion = "";
            let empName = "";
            let empEmail = "";
            let empTitle = "";
            let empTitles = "";

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
                    console.log(res2);
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
                })
                .catch((error) => {
                    if (error) {console.log("You've encountered an error")}
                });
        });
};

inputEmp();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
