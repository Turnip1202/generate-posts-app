'use strict'

const Fastify = require('fastify')
const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifyView = require("@fastify/view")
const fastifyCookie = require('@fastify/cookie')

// 创建 Fastify 实例
const fastify = Fastify({
  logger: true
})

// 注册插件和加载功能
fastify.register(fastifyCookie, {
  secret: "my-secret",
  hook: 'onRequest'
})
fastify.register(fastifyView, {
  engine: {
    ejs: require("ejs")
  }
})
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
})
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
})

// 手动启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    fastify.log.info(`Server listening on http://0.0.0.0:3000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()