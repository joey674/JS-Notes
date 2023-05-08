const express = require("express")
const { query, validationResult, matchedData, body } = require('express-validator')

const router = express.Router()


router.get('/', function (req, res) {
    console.log("GET:/");
    res.send("using GET:/");
})

router.post('/', function (req, res) {
    console.log("POST:/");
    res.send("using POST:/");
})

//validator
//单个简单验证 且方式为parameter
router.get('/checkA',
    query('name').notEmpty().escape(),//escape()可以避免用户上传自己的js脚本（而不是用户名）来攻击网站
    (req, res) => {
        console.log('GET:/checkA');
        const error = validationResult(req);
        if (error.isEmpty()) {//这里会返回query中的验证 如果有问题这个数组就非空
        return res.send(`checkA success,name: ${req.query.name}`);
        }else{
            res.send({ errors: error.array() });
        }
    }
)

//多个简单验证
router.get('/checkB',
    query('name').notEmpty(),//这里可以添加多个query验证；；
    query('email').isEmail(),
    query('password').isLength({min: 5, max: 10}), 
    (req, res) => {
        console.log('GET:/checkB');
        const error = validationResult(req);
        if (error.isEmpty()) {
            const data = matchedData(req);//matcheddata可以读取req中传入的变量并输入成数组
            return res.send(`checkB success,\nname:${data.name}\nemail:${data.email}\npassword:${data.password}`);
        }else{
            res.send({ errors: error.array() });
        }
    }
)

//独立成变量
const createNameChain = () => body('name').notEmpty();
router.get('/checkC',
    createNameChain,
    (req, res) => {
        console.log('GET:/checkC');
        const error = validationResult(req);
        if (error.isEmpty()) {
        return res.send(`checkC success,name: ${req.query.name}`);
        }else{
            res.send({ errors: error.array() });
        }
    }
)

//输入为json格式时的验证（记得输入的body的格式调成JSON）
const validations = {//validations是个对象，有两个属性checkD，checkE；；checkD的值是一个对象，对象里是两个数组 get和post
    '/checkD': {
        GET: [
            body('name')
                .notEmpty(),
            body('email')
                .notEmpty()
                .isEmail(),
            body('password')
                .isLength({min: 5, max: 10}),
            body('passwordReConfirm').custom((value, {req})=>{//自定义validator
                return value === req.body.password;
            }),
            body('a.*.c')//b可以为任意；；可以筛选出所有符合条件的元素
                .optional(),
            body('**.c')//可以找到c，不论c嵌套多深
                .optional()
        ],
        POST: [
            //...
        ]
    },
    '/checkE': {
        //...
    }
}
function validate(){
    return async (req,res,next) =>{
        const url = req.url;// /checkD
        const method = req.method;// get/post
        if(Object.prototype.hasOwnProperty.call(validations, url) && Object.prototype.hasOwnProperty.call(validations[url],method)) {//确定a有b这个属性。这里就是去找validations里有没有符合条件的校验规则
            const curValidation = validations[url][method];
            await Promise.all( curValidation.map(  (validation) => {return validation.run(req)}  ));//promise.all会接受一个被处理的数组。如果数组全部处理完成，返回resolve；map是遍历验证这个对象下面所有校验规则；；validation.run去运行那一项验证规则。
            const error = validationResult(req);//如果有不符合的， 这里error会非空
            if (!error.isEmpty()){
                return res.json({
                    msg: 'error: please check the request parameters',
                    data: error.array()
                })
            }
        }
        next();//这里就是让get继续处理
    }
}

router.get('/checkD', validate(),//一般来讲 都会有中间件去解析req.body。中间件需要有next参数 意思是validator处理完后让get继续处理
    (req, res) => {
        console.log('GET:/checkD');
        const message = 'checkD success ';
        res.json({  
                msg: message,
                data: req.body 
        });
    }
)





module.exports = router;