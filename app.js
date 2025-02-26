'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifyView = require("@fastify/view")
const fastifyCookie = require('@fastify/cookie')
// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  // 注册 cookie 插件
  fastify.register(fastifyCookie, {
    secret: "my-secret", // 请更改为你的密钥
    hook: 'onRequest'
  })
  fastify.register(fastifyView, {
    engine: {
      ejs: require("ejs")
    }
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = options
