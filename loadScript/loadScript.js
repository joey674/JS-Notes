const fs = require("fs-extra");
const path = require("path");

const script_dir = __dirname;//这里如果在不同文件夹就pathjoin一下

function loadScript(){
    if (fs.existsSync(script_dir)){
        const scriptNames = fs.readdirSync(script_dir);
        const scriptPaths = scriptNames.map((scriptName) => {
            return path.join(script_dir,scriptName);
        });
        const functionArray = [];
        for (const scriptPath of scriptPaths){
            const { scriptFunction } = require(scriptPath);//关键的一步 也就是说可以从文件夹下读取所有export 到这个变量里。如果有export且export是一个函数 就可以读取。
            if(scriptFunction){
                functionArray.push(scriptFunction);
            }
        }
        return functionArray;
    }
}

funcArray = [];
funcArray = loadScript();
if (Array.isArray(funcArray) && funcArray)
for (const scriptFunction of funcArray){
    scriptFunction();
}

module.exports = { loadScript };