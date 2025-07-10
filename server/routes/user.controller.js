// 模拟用户数据库
const usrPwds = require('../db/db.js')
const { getPostDate } = require("../utils")


module.exports = async function (fastify, opts) {
  // 登录页面路由
  fastify.get("/", async (request, reply) => {
    const date = getPostDate(new Date())
    return reply.view("template/login.ejs", {
      pageTitle: '登录',
      user: 'Turnip1202',
      currentTime: date
    })
  })

  // 登录处理路由
  fastify.post("/login", async (request, reply) => {
    const { username, password } = request.body

    try {
      // 验证用户名和密码是否为空
      if (!username || !password) {
        return reply.code(400).send({
          success: false,
          message: '用户名和密码不能为空'
        })
      }

      // 在 usrPwds 数组中查找匹配的用户
      const user = usrPwds.find(user =>
        user.userName === username && user.password === password
      )

      if (user) {
        // 返回成功响应
        return reply.code(200).send({
          success: true,
          message: '登录成功',
          data: user
        })
      } else {
        // 用户名或密码错误
        return reply.code(401).send({
          success: false,
          message: '用户名或密码错误'
        })
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({
        success: false,
        message: '服务器错误，请稍后重试'
      })
    }
  })
}