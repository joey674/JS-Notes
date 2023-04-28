'use strict';

const fs = require("fs");

var context_0 = "context_0...";
var context_1 = "context_1...";

fs.writeFile("file", context_1, function(error){
    if(error){
        console.log(error);
    }else{
        console.log("write finished.");
    }
})

var context;

fs.readFile("file" , function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log("read finished.");
        console.log(data.toString());
    }
})

