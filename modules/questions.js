const inquirer = require("inquirer");
const apiCall= require("./apiCall");

// questions that will be prompted to user
function askQuestion(){
const questions = [{
    message:"Enter your GitHub Username",
    name:"username"
    
},
{
    type:"list",
    message:"Choose a color",
    choices:['green', 'blue', 'pink', 'red'],
    name:"color"

}];

// prompting questions to user

inquirer.prompt(questions)

.then(function({username, color}) {
    apiCall(username,color);
});
};
module.exports = askQuestion;