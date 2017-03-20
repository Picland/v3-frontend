module.exports = function (app) {
  app.get('/', (req, res) => {
    res.redirect('/articles')
  })
  app.use('/register', require('./register'))
  app.use('/login', require('./login'))
  app.use('/logout', require('./logout'))
  app.use('/articles', require('./articles'))
  app.use('/test', require('./test'))

  // 404 page
  app.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
