const router = require('express').Router()

// GET /test 测试页
router.get('/', (req, res, next) => {
  res.render('app')
})

module.exports = router
