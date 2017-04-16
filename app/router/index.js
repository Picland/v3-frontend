import register from './register'
import login from './login'
import logout from './logout'
import articles from './articles'
import app1 from './app'

export default function (app) {
  app.get('/', (req, res) => {
    res.redirect('/articles')
  })
  app.use('/register', register)
  app.use('/login', login)
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
