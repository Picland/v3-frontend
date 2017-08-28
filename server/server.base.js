import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
// import formidable from 'express-formidable' // 接收表单及文件的上传中间件
import connectMongo from 'connect-mongo' // 将 session 存储于 mongodb，结合 express-session 使用
import config from 'config-lite'
import router from '../src/router/serverRouter'
import pkg from '../package.json'
import winston from 'winston'
import expressWinston from 'express-winston'
import favicon from 'serve-favicon'

const MongoStore = connectMongo(session)
const server = express()

server.use(bodyParser.json())

// --------------------------------------------------------------------------
// static resource config
// --------------------------------------------------------------------------
server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')))
server.use(express.static(path.join(__dirname, '../static')))

// --------------------------------------------------------------------------
// session middleware config
// --------------------------------------------------------------------------
server.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: config.mongodb // mongodb 地址
  })
}))

// 处理表单及文件上传的中间件
// server.use(formidable({
//   uploadDir: path.join(__dirname, '../static/img'), // 上传文件目录
//   keepExtensions: true // 保留后缀
// }))

// --------------------------------------------------------------------------
// success log
// --------------------------------------------------------------------------
server.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'log/success.log'
    })
  ]
}))

// --------------------------------------------------------------------------
// router
// --------------------------------------------------------------------------
router(server)

// --------------------------------------------------------------------------
// error log
// --------------------------------------------------------------------------
server.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'log/error.log'
    })
  ]
}))

// --------------------------------------------------------------------------
// error page
// --------------------------------------------------------------------------
server.use((err, req, res, next) => {
  res.render('error', {
    error: err
  })
})

// --------------------------------------------------------------------------
// start
// --------------------------------------------------------------------------
server.listen(config.port, () => {
  console.log(`----\n==> ✅  ${pkg.name} listening on http://localhost:${config.port}\n----`)
})
