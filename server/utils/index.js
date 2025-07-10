const dayjs = require('dayjs')()

const getPostDate = (date) => dayjs.format('YYYY-MM-DD HH:mm:ss', date)

module.exports = {
  getPostDate
}