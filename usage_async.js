/*
    async函数作用是，他可以在里面嵌套别的返回promise对象的回调函数。
    也就是说，这样也可以避免回调嵌套。具体实现就是，用await会等待嵌
    套的回调函数B执行完毕后在继续执行A。同时用try/catch来回应promise
    中resolve和reject。
    同时 用async和await可以更明确执行顺序。且await的后面一定要跟async
    函数或者是promise函数
*/
function C(){
    return new Promise((resolve, reject) =>{
        console.log('C start')
        let n = parseInt(Math.random()*6 + 1,10)
        if(n<3){
            console.log('n =',n)
            console.log('C finished')
            resolve(n)//将会继续执行try的左边，也就是n = C()
        }else{
            console.log('n =',n)
            console.log('C finished')
            reject(n)//传到catch里的error中
        }
    })
}
async function B(n){
    console.log('B start')
    try{
        n = await C()
        console.log('n =',n)
        console.log('B finished')
        return n//async函数可以用return向上返回值
    }catch(error){
        n = error
        console.log('n =',error)
        console.log('B finished')
        return error
    }
}

async function A(){
    console.log('A start')
    let n = await B()
    console.log('n =',n)
    console.log('A finished')
}

A()