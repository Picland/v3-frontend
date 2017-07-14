/**
 * @fileoverview Router config on server side
 * @author mrgaonju@gmail.com
 */

import auth from '../middleware/auth'
import loginController from '../controller/loginController'
import logoutController from '../controller/logoutController'
import userController from '../controller/userController'
import renderService from '../service/renderService'
// import authorize from '../middleware/authorize'
// import registerController from '../controller/registerController'
// import articleController from '../controller/articleController'
// import commentController from '../controller/commentController'

export default (server) => {
  server.get('/', auth.isLogin, (req, res) => { res.redirect('/settings/preview') })
  server.get('/logout', auth.isLogin, logoutController.logout)

  // --------------------------------------------------------------------------
  // Restful API version 1
  // --------------------------------------------------------------------------
  server.post('/api/v1/login', auth.isNotLogin, loginController.login)
  server.get('/api/v1/user/status', userController.getUserStatus) // GET whether user is login

  // --------------------------------------------------------------------------
  // Turn over others page to client router and render
  // --------------------------------------------------------------------------
  server.get('/*', (req, res) => {
    console.log('进入/*')
    res.status(200).send(renderService(req.url))
  })

  // --------------------------------------------------------------------------
  // 404 Page in server side, may remove to clint side
  // --------------------------------------------------------------------------
  server.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })

  // --------------------------------------------------------------------------
  // Old Multiple Pages Router
  // --------------------------------------------------------------------------
  //
  // // GET /register 注册页
  // server.get('/register', authorize.isNotLogin, registerController.renderRegisterPage)
  //
  // // POST /register 用户注册
  // server.post('/register', authorize.isNotLogin, registerController.createUser)
  //
  // // GET /articles 所有用户或者特定用户的文章页
  // // eg: GET /articles?author=xxx
  // server.get('/articles', authorize.isLogin, articleController.getAllArticles)
  //
  // // GET /articles/create 发表文章页
  // server.get('/articles/create', authorize.isLogin, articleController.renderCreateArticlePage)
  //
  // // POST /articles 发表一篇文章
  // server.post('/articles', authorize.isLogin, articleController.createArticle)
  //
  // // GET /articles/:articleId 单独一篇的文章页
  // server.get('/articles/:articleId', articleController.getOneArticle)
  //
  // // GET /articles/:articleId/edit 更新文章页
  // server.get('/articles/:articleId/edit', authorize.isLogin, articleController.editArticlePage)
  //
  // // POST /articles/:articleId/edit 更新一篇文章
  // server.post('/articles/:articleId/edit', authorize.isLogin, articleController.editArticle)
  //
  // // GET /articles/:articleId/remove 删除一篇文章
  // server.get('/articles/:articleId/remove', authorize.isLogin, articleController.deleteArticle)
  //
  // // POST /articles/:articleId/comment 创建一条留言
  // server.post('/articles/:articleId/comment', authorize.isLogin, commentController.createComment)
  //
  // // GET /articles/:articleId/comment/:commentId/remove 删除一条留言
  // server.get('/articles/:articleId/comment/:commentId/remove', authorize.isLogin, commentController.deleteComment)
}
