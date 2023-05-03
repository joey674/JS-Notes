//promise函数异步执行
let A = 2;
function functionA(){
    return new Promise((resolve,reject) => {//Promise中有一个函数，并向里面传两个参数
        console.log("functionA start......");
        if (A < 5){
            resolve();
        }else{
            reject();
        }
    })
    .then(() => {//成功时执行这个函数
        console.log("func success");    
    })
    .then(function () {//then,catch接受链式
        console.log("func success2");
    })
    .catch(() => {//失败时执行这个函数 且catch只能有一个 用于捕捉reject错误
        console.log("functionA failed");
    })
    .finally(() => {//最终执行
        console.log("functionA finished......");
    })
}

let B = 2;
function functionB(){
    return new Promise((resolve,reject) => {//这两个参数也可以传递参数
        console.log("functionB start......");
        if (B < 5){
            resolve(111);
        }else{
            reject(999);
        }
    })
    .then((value) => {
        console.log("value1:",value);    
        return 222;
    })
    .then((value) => {
        console.log("value2:",value);
        return 333;
    })
    .catch((value) => {
        console.log("failed value:",value);
    })
    .finally(() => {
        console.log("functionB finished......");
    })
}

functionA();
functionB();