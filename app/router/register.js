const router = require('express').Router()
const authorize = require('../middleware/authorize')
const registerController = require('../controller/registerController')

// GET /register 注册页
router.get('/', authorize.isNotLogin, registerController.renderRegisterPage)

// POST /register 用户注册
router.post('/', authorize.isNotLogin, registerController.createUser)

module.exports = router
