const gTemplate = require("./template.js")
// 预设的标签和分类（实际项目中可能来自数据库或配置文件）
const predefinedTags = [
  'JavaScript',
  "Electron",
  "Java",
  "C#",
  "Python",
  "Django",
  "SpringCloud",
  "Spring",
  'Node.js',
  'Fastify',
  'Express',
  'MySQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'Markdown',
  'Blogging',
  'mybatis'
]
const predefinedCategories = [
  'backend',
  'frontend',
  'database',
  'devops',
  'programming',
  'React',
  'Vue',
  'Angular'
]
module.exports = {
  predefinedTags,
  predefinedCategories,
  gTemplate
}