const fs = require("fs-extra");
const path = require("path");

const script_dir = path.join(__dirname,"./script");

function loadScript(){
    if (fs.existsSync(script_dir)){
        const scriptNames = fs.readdirSync(script_dir);
        const scriptPaths = scriptNames.map((scriptName) => {
            return path.join(script_dir,scriptName);
        });
        const functionArray = [];
        for (const scriptPath of scriptPaths){
            const { scriptFunction } = require(scriptPath);
            functionArray.push(scriptFunction);
        }
        return functionArray;
    }
}

funcArray = [];
funcArray = loadScript();
for (const scriptFunction of funcArray){
    scriptFunction();
}


module.exports = { loadScript };