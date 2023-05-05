/*
    模拟了一个假串口关闭和打开 创建一个串口检测函数  并且会在串口关闭后重新尝试连接。
    这里主要是一个事件驱动模型，相较于隔一段时间检测 我们选择用listener去检测事件发
    生并作出相应措施。
    listener在一个循环中，event在一个循环中。都是占用主线程。只有io操作是异步的。
 */
const { SerialPortMock } = require ('serialport');
const { MockBinding } = require('@serialport/binding-mock');

var port0Status ='close'
const path0 = '/dev/mockport0';
var port0 = new SerialPortMock({
    path: path0,
    baudRate: 115200,
    autoOpen: false,
})
setTimeout(() => {
    MockBinding.createPort( path0 )
},3000)
setTimeout(() => {
    port0.close()
},6000)


function openPort(port){
    return new Promise((resolve) => {
        port.open((err) => {
            if (err) {
                console.log(err.message)
                resume(port)
                resolve()
            }else{
                console.log('open succcess.')
                port0Status = 'open'
                resolve()
            }
        })
    })
}
function resume(port) {
    setTimeout(() => { openPort(port) }, 1000)
}

port0.on('open',() =>{setInterval( () =>{
        if(port0Status === 'open'){
            port0.port.emitData('[...mockdata...]')
        }
    },1000)})
port0.on('data', (data) => {
    console.log('received data: ',data.toString())
})
port0.on('close', () => {
    port0Status = 'close'
    console.log('port close.retrying to open...')
    resume(port0)
})
port0.on('error', () => {
    port0Status = 'close'
    console.log('port error.retrying to open...')
    resume(port0)
})


openPort(port0)

