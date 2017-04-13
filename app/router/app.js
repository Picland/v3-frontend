const router = require('express').Router()
// const authorize = require('../middleware/authorize')
// const loginController = require('../controller/loginController')

// // GET /login 登录页
// router.get('/login', authorize.isNotLogin, loginController.renderLoginPage)
//
// // POST /login 用户登录
// router.post('/login', authorize.isNotLogin, loginController.login)

// GET /test 测试页
router.get('/', (req, res, next) => {
  res.render('app')
})

module.exports = router
