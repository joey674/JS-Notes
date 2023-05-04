//函数内定义promise 使得函数异步执行 

let B = 2;
function functionB(){
    return new Promise((resolve,reject) => {//Promise中有一个函数，并向里面传两个参数 ,这两个参数也可以传递参数
        console.log("functionB start......");
        if (B < 5){
            resolve(1);
        }else{
            reject(9);
        }
    })
    .then((value) => {
        console.log("value1:",value);//成功时执行这个函数
        return 2;
    })
    .then((value) => {
        console.log("value2:",value);//then,catch接受链式
        return 3;
    })
    .catch((value) => {
        console.log("failed value:",value);//失败时执行这个函数 且catch只能有一个 用于捕捉reject错误
    })
    .finally(() => {
        console.log("functionB finished......");//无论进入then还是catch 都会执行finally
    })
}

functionB();



const varB = new Promise((resolve,reject) => {
        console.log("varB creat......");
        if (B < 5){
            resolve(11);
        }else{
            reject(99);
        }
});
varB.then((value) => {
    console.log("value1:",value);    
    return 22;
})
.then((value) => {
    console.log("value2:",value);
    return 33;
})
.catch((value) => {
    console.log("failed value:",value);
})
.finally(() => {
    console.log("varB finished......");
});

//varB这里在创建变量时，创建promise函数 然后执行；；
//而functionB是先定义，只有在运行的时候才去创建一个promise函数；；