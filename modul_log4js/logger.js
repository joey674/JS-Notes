const log4js = require('log4js')

log4js.configure({
    //定义日志输出形式：输出到控制台 输出到文件
    appenders: {
        console: { 
            type: 'console' 
        },
        file: { 
            type: 'file',
            filename: 'Xservice_log' 
            //这里还可以接着添加file的信息
        }
    },
    //logger形式：
    //appenders表示输出形式；；
    //level则对输出的消息进行了分类，可以分成info，warn，error，debug之类的消息；；
    //(这里我们只定义了一个default，可以定义多个，但是必须要有一个default)
    categories: {
        default: { 
            appenders: ['console', 'file'], 
            // appenders: ['console'], 
            level: 'all' 
        },
    }
})

const logger = log4js.getLogger('Xservice');//这里可以从categories选择一个logger；；

module.exports = logger; 
