const config = require('../config')
const predefinedTags = config.predefinedTags
const predefinedCategories = config.predefinedCategories

module.exports = async function (fastify, opts) {
  // 获取可用的标签和分类
  fastify.get('/config', async (request, reply) => {
    return {
      tags: predefinedTags,
      categories: predefinedCategories
    }
  })

}