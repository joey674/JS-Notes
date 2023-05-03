let A = 6;

function functionA(){
    return new Promise((resolve,reject) => {//Promise中有一个函数，并向里面传两个参数
        if (A < 5){
            resolve();
        }else{
            reject();
        }
    })
    .then(() => {//成功时执行这个函数
        console.log("success.");
    })
    .catch(() => {//失败时执行这个函数
        console.log("failed.");
    })
}

functionA();