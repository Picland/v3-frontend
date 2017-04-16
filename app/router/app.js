import express from 'express'
import authorize from '../middleware/authorize'
import appController from '../controller/appController'

const router = express.Router()

// GET /login 登录页
router.get('/login', authorize.isNotLogin, appController.renderLoginPage)

// POST /login 用户登录
router.post('/login', authorize.isNotLogin, appController.login)

// GET /test 测试页
// router.get('/', (req, res, next) => {
//   res.render('app')
// })

export default router
