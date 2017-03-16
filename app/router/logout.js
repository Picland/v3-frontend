const router = require('express').Router()
const checkMiddleware = require('../middleware/check')
const logoutController = require('../controller/logoutController')

// GET /logout 登出
router.get('/', checkMiddleware.checkLogin, logoutController.logout)

module.exports = router
