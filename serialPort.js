const serialPort = require("serialport");

serialPort.list()
.then(( ports ) => {
    console.log(ports);
} )
.catch(( error ) => {
    console.log(error);
})

