/**
 * Restful API definition.
 *
 * @returns {Function} Api function that lets `server.base.js` can use.
 */

import auth from '../middleware/auth'
import loginController from '../controller/loginController'
import logoutController from '../controller/logoutController'
import userController from '../controller/userController'
import registerController from '../controller/registerController'
// import articleController from '../controller/articleController'
// import commentController from '../controller/commentController'

export default (server) => {
  // --------------------------------------------------------------------------
  // Restful API version 1
  // --------------------------------------------------------------------------
  server.post('/api/v1/login', auth.isNotLogin, loginController.login)
  server.post('/api/v1/register', auth.isNotLogin, registerController.createUser)
  server.get('/api/v1/logout', auth.isLogin, logoutController.logout)
  server.get('/api/v1/user/status', userController.getUserStatus)
  server.post('/api/v1/updateUserInfo', auth.isLogin, userController.updateUserInfo)
  server.post('/api/v1/updateUserAvatar', auth.isLogin, userController.updateUserAvatar)

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
