const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML.js");
const convertFactory = require("electron-html-to");

const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});


getGitHubInfo = async (username, colorPicked) => {
    let res = await axios.get("https://api.github.com/users/" + username);
    const data = res.data;
    await fs.writeFile("index.html", generateHTML.generateHTML(data, colorPicked), function(err){
        if(err){
            return console.log(err);
        }
        else{
            console.log("done");
        }
    });

    await conversion({ html: generateHTML.generateHTML(data, colorPicked) }, function(err, result) {
        if (err) {
            return console.error(err);
        }
        
        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream('./index.pdf'));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        });
}

function getUserInput(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter a GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "Enter a color:",
            name: "color"
        }
    ])
    .then(answers => {
        const username = answers.username;
        const colorPicked = answers.color;
        getGitHubInfo(username, colorPicked);
    });
}

getUserInput();