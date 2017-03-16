const router = require('express').Router()
const checkMiddleware = require('../middleware/check')
const loginController = require('../controller/loginController')

// GET /login 登录页
router.get('/', checkMiddleware.checkNotLogin, loginController.renderLoginPage)

// POST /login 用户登录
router.post('/', checkMiddleware.checkNotLogin, loginController.login)

module.exports = router
