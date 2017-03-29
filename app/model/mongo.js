/**
 * 预定义模式(predefined schema)进行写数据库时的校验
 * 并创建collection
 */

const config = require('config-lite')
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind(results) {
    results.forEach((item) => {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne(result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

// User Collection
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
})
exports.User.createIndex({ name: 1 }, { unique: true }).exec() // 根据用户名找到用户，用户名全局唯一

// Article Collection
exports.Article = mongolass.model('Article', {
  author: { type: Mongolass.Types.ObjectId },
  title: { type: 'string' },
  content: { type: 'string' },
  pv: { type: 'number' }
})
exports.Article.createIndex({ author: 1, _id: -1 }).exec() // 按创建时间降序查看用户的文章列表

// Comment Collection
exports.Comment = mongolass.model('Comment', {
  author: { type: Mongolass.Types.ObjectId },
  content: { type: 'string' },
  articleId: { type: Mongolass.Types.ObjectId }
})
exports.Comment.createIndex({ articleId: 1, _id: 1 }).exec() // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.createIndex({ author: 1, _id: 1 }).exec() // 通过用户 id 和留言 id 删除一个留言
