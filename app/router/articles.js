const router = require('express').Router()
const authorize = require('../middleware/authorize')
const articleController = require('../controller/articleController')
const commentController = require('../controller/commentController')

// GET /articles 所有用户或者特定用户的文章页
// eg: GET /articles?author=xxx
router.get('/', articleController.getAllArticles)

// GET /articles/create 发表文章页
router.get('/create', authorize.isLogin, articleController.getCreateArticlePage)

// POST /articles 发表一篇文章
router.post('/', authorize.isLogin, articleController.createArticle)

// GET /articles/:articleId 单独一篇的文章页
router.get('/:articleId', articleController.getOneArticle)

// GET /articles/:articleId/edit 更新文章页
router.get('/:articleId/edit', authorize.isLogin, articleController.editArticlePage)

// POST /articles/:articleId/edit 更新一篇文章
router.post('/:articleId/edit', authorize.isLogin, articleController.editArticle)

// GET /articles/:articleId/remove 删除一篇文章
router.get('/:articleId/remove', authorize.isLogin, articleController.deleteArticle)

// POST /articles/:articleId/comment 创建一条留言
router.post('/:articleId/comment', authorize.isLogin, commentController.createComment)

// GET /articles/:articleId/comment/:commentId/remove 删除一条留言
router.get('/:articleId/comment/:commentId/remove', authorize.isLogin, commentController.deleteComment)

module.exports = router
