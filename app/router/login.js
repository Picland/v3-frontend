import express from 'express'
import authorize from '../middleware/authorize'
import loginController from '../controller/loginController'

const router = express.Router()

// GET /login 登录页
router.get('/', authorize.isNotLogin, loginController.renderLoginPage)

// POST /login 用户登录
router.post('/', authorize.isNotLogin, loginController.login)

export default router
