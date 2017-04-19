import register from './register'
// import login from './login'
import logout from './logout'
import articles from './articles'
import app1 from './app'

import authorize from '../middleware/authorize'
import loginController from '../controller/loginController'

export default function (app) {
  app.get('/', (req, res) => {
    res.redirect('/articles')
  })
  app.use('/register', register)
  // app.use('/login', login)
  // GET /login 登录页
  app.get('/login', authorize.isNotLogin, loginController.renderLoginPage)

  // POST /login 用户登录
  app.post('/login', authorize.isNotLogin, loginController.login)
  app.use('/logout', logout)
  app.use('/articles', articles)
  app.use('/app', app1)

  // 404 page
  app.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}

// express.router().get 和 app.get .post
