// import Mock from 'mockjs'

// 引入 mock.js
const Mock = require('mockjs')

//延时400s请求到数据
Mock.setup({
    timeout: 400
})
//延时200-600毫秒请求到数据
Mock.setup({
    timeout: '200-600'
})

//Mock.mock  接口，请求方式，返回数据（数据就是json文件夹中的文件自行添加）
Mock.mock('/user/list', 'get', require('./json/userList'))

// const Mock = require('mockjs'); // 导入依赖模块


// 返回一个函数
/*module.exports = function(app){
    // 监听 http 请求
    app.get('/user/list', function(rep, res){
        // 设置要返回的数据
        let json = {
            id: "@id()",                    // 得到随机的id
            username: "@cname()",           // 随机生成中文名字
            date: "@date()",                // 随机生成日期
            avatar: "@image('200x200','red','#fff','avatar')",  // 生成图片
            description: "@paragraph()",    // 描述
            ip: "@ip()",                    // ip地址
            email: "@email()",              // email
        }
        res.json(Mock.mock(json));
    });
}*/

