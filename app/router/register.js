const router = require('express').Router()
const checkMiddleware = require('../middleware/check')
const registerController = require('../controller/registerController')

// GET /register 注册页
router.get('/', checkMiddleware.checkNotLogin, registerController.renderRegisterPage)

// POST /register 用户注册
router.post('/', checkMiddleware.checkNotLogin, registerController.createUser)

module.exports = router
