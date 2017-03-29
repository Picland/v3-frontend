const router = require('express').Router()
const authorize = require('../middleware/authorize')
const loginController = require('../controller/loginController')

// GET /login 登录页
router.get('/', authorize.isNotLogin, loginController.renderLoginPage)

// POST /login 用户登录
router.post('/', authorize.isNotLogin, loginController.login)

module.exports = router
