import express from 'express'
import authorize from '../middleware/authorize'
import registerController from '../controller/registerController'

const router = express.Router()

// GET /register 注册页
router.get('/', authorize.isNotLogin, registerController.renderRegisterPage)

// POST /register 用户注册
router.post('/', authorize.isNotLogin, registerController.createUser)

export default router
