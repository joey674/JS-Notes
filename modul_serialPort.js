const { SerialPort } = require("serialport");//这个大括号必不可少 不知道为什么他们的代码可行 但是这里只有大括号可以跑

//返回所有可用串口    .list函数是一个返回promise的函数 
SerialPort.list().then((ports) => {
    console.log(ports); 
}).catch((err) => {
    console.log(err);
})

//设置串口
const port0 = new SerialPort({//设置成手动打开
  path: '/dev/ttyUSB11',
  baudRate: 115200,
  autoOpen: false,
})
const port1 = new SerialPort({//也可以设置成自动打开，同时接受回调函数确认是否打开
    path: "/dev/ttyUSB12",
    baudRate: 115200,
}, (error) => {
    if(error){
        console.log("open fail with message: ",error.message);
    }
})

//手动打开串口
port0.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
})

//on可以注册事件 open事件表示在串口打开时触发;;data表示串口收到数据时触发;;
port0.on('open', () => {
    console.log("port open.");
})
port0.on('close', () => {
    console.log('port close.');
})
port0.on('data', (data) => {//传入data的方式读取收到的数据
    console.log('Received data:', data);
})
port0.on('readable', function () {//用read方式读取收到的数据
    console.log('Received data:', port0.read())
})

//write可以向串口输出数据
port0.write('write string')
port0.write(Buffer.from('write buffer'))
