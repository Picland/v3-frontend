const router = require('express').Router()
const authorize = require('../middleware/authorize')
const logoutController = require('../controller/logoutController')

// GET /logout 登出
router.get('/', authorize.isLogin, logoutController.logout)

module.exports = router
