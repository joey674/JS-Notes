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

var context = undefined;

fs.readFile("file" , function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log("read finished.");
        console.log(data);
        console.log(data.toString());
        context = data ;
    }
})

setTimeout(function(){
    console.log(context);
},100)

setTimeout(()=>{
    console.log(context.toString());
},200)