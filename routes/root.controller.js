'use strict'


// 模拟用户数据库
const usrPwds = require('../db/db.js')
const { getPostDate } = require("../utils")



// 添加简单的认证中间件
module.exports = async function (fastify, opts) {
  const currentTime = getPostDate(new Date())
  //匹配不到的路由，返回错误页面
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404)
    reply.view('template/error.ejs', {
      code: 404,
      message: 'Not Found',
      user: "Turnip1202",
      currentTime,
    })
  })

}