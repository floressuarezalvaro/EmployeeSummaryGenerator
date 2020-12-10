const promptQs = [
    {
        type: "input",
        message: "Hello, what is your name?",
        name: "nameInput",
    },
    {
        type: "input",
        message: "What is your e-mail?",
        name: "emailInput",
        },
    {
        type: "list",
        message: "What is your job title?",
        name: "titleInput",
        choices: [
            "Manager",
            "Intern",
            "Engineer",
        ],
    }
]

module.exports = promptQs;