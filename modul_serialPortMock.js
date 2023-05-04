const { SerialPortMock } = require ('serialport');

//模拟一个假的串口 创建且打开
const path = '/dev/mockport0';
SerialPortMock.binding.createPort( path );
SerialPortMock.list().then( (ports) => {
    console.log(ports);
})
const port0 = new SerialPortMock({
    path: '/dev/mockport0',
    baudRate: 115200,
    autoOpen: false,
})
port0.open((err) => {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
    console.log('open succcess.');
})

// 模拟串口收到数据
port0.on('open', () => {
    port0.port.emitData('[...mockdata...]');
})

port0.on('data', (data) => {
    console.log('received data: ',data.toString());
})

