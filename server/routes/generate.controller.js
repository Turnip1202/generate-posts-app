const fs = require('fs-extra')
const path = require('path')
const config = require('../config')
const predefinedTags = config.predefinedTags
const predefinedCategories = config.predefinedCategories
const { getPostDate } = require("../utils")

// 模拟用户数据库
const usrPwds = require('../db/db.js')
module.exports = async function (fastify, opts) {
  // 生成文件
  fastify.post('/generate', async (request, reply) => {
    const {
      fileName,
      fileType = 'md',
      template,
      savePath,
      title,
      description,
      tags = [],
      category,
      draft = false
    } = request.body

    try {
      // 验证必需的字段
      if (!fileName || !savePath || !title || !description) {
        throw new Error('Missing required fields')
      }

      // 验证标签和分类是否有效
      if (tags.some(tag => !predefinedTags.includes(tag))) {
        throw new Error('Invalid tags')
      }
      if (category && !predefinedCategories.includes(category)) {
        throw new Error('Invalid category')
      }

      // 构建完整的文件路径
      const fullPath = path.join(savePath, `${fileName}.${fileType}`)

      // 检查目录是否存在，不存在则创建
      await fs.ensureDir(savePath)

      // 构建文件内容
      const currentDate = getPostDate(new Date())
      console.log("currentDate", currentDate)
      const frontMatter = config.gTemplate(title, currentDate, description, tags, category, draft)

      // 组合完整的文件内容
      const fileContent = `${frontMatter}\n${template || ''}`
      // console.log(fileContent)

      // 写入文件
      await fs.writeFile(fullPath, fileContent, 'utf8')

      return {
        success: true,
        message: 'File generated successfully',
        filePath: fullPath
      }
    } catch (error) {
      reply.status(400)
      return {
        success: false,
        message: error.message
      }
    }
  })

  fastify.get("/generate/:usrPwds", async (request, reply) => {
    const userInfo = request.params.usrPwds;
    const currentTime = getPostDate(new Date())
    //usrPwds的格式是 userName&password
    const [userName, password] = userInfo.split("&");
    const user = usrPwds.find(usrPwd => usrPwd.userName === userName && usrPwd.password === password)
    if (!user) {
      reply.status(401)
      return reply.view("template/error.ejs", {
        code: 401,
        message: 'Unauthorized',
        user: userName,
        currentTime,
      })
    }



    return reply.view("/template/index.ejs", {
      user: userName,
      currentTime,
      pageTitle: '文件生成管理系统'
    })
  })
}