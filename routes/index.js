module.exports = function (app) {
  app.get('/', (req, res) => {
    res.redirect('/posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))

  // 404 page
  app.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
