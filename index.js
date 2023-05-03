const cors = require("cors");
const express = require("express");//快速建立web server
const router = require("./router");
const logger = require("./logger");
const ZDBridge = require("./bridge");
const QXReceiverManager = require("./rcvrMgr");
const { readConfigSync } = require("./config");

const port = 6010;
const app = express();

app.use(cors());//允许其他浏览器跨域发送请求到本地，获取资源
app.use(express.json());                        //处理请求中JSON格式数据转换成req.body对象内容
app.use(express.urlencoded({ extended: true }));//处理请求中html表单（key1=value1&key2=value2）格式数据转换成req.body对象内容
app.use(router);//这里用的是express.router,然后在router.js中定义了他的RESTful接口
app.listen(port, () => {//创建server 当有请求是触发回调函数。这样就能处理高并发请求
    logger.debug(`App is listening on port ${port}.`);
    ZDBridge.getInstance().readLogFoler().then((rootDir) => {
        logger.debug('rootDir=', rootDir);
        const config = readConfigSync();
        if (config) {
            QXReceiverManager.getInstance().reload(config);
            QXReceiverManager.getInstance().forward(config);
        }
    }).catch((reason) => {
        logger.debug(reason);
    })
});
