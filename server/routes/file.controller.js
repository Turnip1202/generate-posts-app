const fs = require('fs-extra')
const path = require('path')

module.exports = async function (fastify, opts) {


  // 删除文件
  fastify.delete('/file', async (request, reply) => {
    const { filePath } = request.body

    try {
      if (!filePath) {
        throw new Error('File path is required')
      }

      // 检查文件是否存在
      if (!await fs.pathExists(filePath)) {
        throw new Error('File does not exist')
      }

      // 删除文件
      await fs.remove(filePath)

      return {
        success: true,
        message: 'File deleted successfully'
      }
    } catch (error) {
      reply.status(400)
      return {
        success: false,
        message: error.message
      }
    }
  })

  // 获取文件列表
  fastify.get('/files', async (request, reply) => {
    const { directory } = request.query

    try {
      if (!directory) {
        throw new Error('Directory path is required')
      }

      // 检查目录是否存在
      if (!await fs.pathExists(directory)) {
        throw new Error('Directory does not exist')
      }

      // 获取文件列表
      const files = await fs.readdir(directory)
      const fileDetails = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(directory, file)
          const stats = await fs.stat(filePath)
          return {
            name: file,
            path: filePath,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          }
        })
      )

      return {
        success: true,
        files: fileDetails
      }
    } catch (error) {
      reply.status(400)
      return {
        success: false,
        message: error.message
      }
    }
  })
}