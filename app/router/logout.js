import express from 'express'
import authorize from '../middleware/authorize'
import logoutController from '../controller/logoutController'

const router = express.Router()

// GET /logout 登出
router.get('/', authorize.isLogin, logoutController.logout)

export default router
