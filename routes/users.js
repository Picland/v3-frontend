const express = require('express')
const router = express.Router()

const userDao = require('../dao/userDao')

/* GET users listing. */
router.get('/', (req, res, next) => {
  //res.send('respond with a resource')
    res.render('updateUser')
})


// 增加用户
//TODO 同时支持get,post
router.get('/addUser', (req, res, next) => {
    userDao.add(req, res, next)
})


router.get('/queryAll', (req, res, next) => {
    console.log('查询所有user')
    userDao.queryAll(req, res, next)
})

router.get('/query', (req, res, next) => {
    userDao.queryById(req, res, next)
})

router.get('/deleteUser', (req, res, next) => {
    userDao.delete(req, res, next)
})

router.post('/updateUser', (req, res, next) => {
    userDao.update(req, res, next)
})

module.exports = router

