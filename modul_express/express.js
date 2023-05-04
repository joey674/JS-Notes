const cors = require("cors");
const express = require("express");//快速建立web server
const router = require("./router");

const port =6060
const app = express();

app.use(cors());//允许其他浏览器跨域发送请求到本地，获取资源
app.use(express.json());                        //处理请求中JSON格式数据转换成req.body对象内容
app.use(express.urlencoded({ extended: true }));//处理请求中html表单（key1=value1&key2=value2）格式数据转换成req.body对象内容
app.use(router);

var server = app.listen(port, () => {//创建server 
    console.log("server is listening to ",port);
});
