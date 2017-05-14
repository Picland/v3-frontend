import path from 'path'
import express from 'express'
import session from 'express-session'
import formidable from 'express-formidable' // 接收表单及文件的上传中间件
import connectMongo from 'connect-mongo' // 将 session 存储于 mongodb，结合 express-session 使用
import flash from 'connect-flash' // 页面通知提示的中间件，基于 session 实现
import config from 'config-lite' // 读取配置文件
import router from './app/router'
import pkg from './package.json' // package.json
import winston from 'winston' // 日志
import expressWinston from 'express-winston' // 基于 winston 的用于 express 的日志中间件
import hbs from 'hbs'
import fs from 'fs'
// import ReactEngine from 'react-engine'
// import favicon from 'serve-favicon'

const MongoStore = connectMongo(session)

const app = express()

// app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

// create the view engine with `react-engine`
// let engine = ReactEngine.server.create({
//   routes: routes,
//   routesFilePath: join(__dirname, '/public/routes.jsx'),
//   performanceCollector: function (stats) {
//     console.log(stats)
//   }
// })

// 设置模板目录
app.set('views', path.join(__dirname, 'app/view/server'))
// 设置模板引擎为 Handlerbars
app.set('view engine', 'hbs')

const partialsDir = path.join(__dirname, 'app/view/server/partial')

let filenames = fs.readdirSync(partialsDir)

filenames.forEach((filename) => {
  let matches = /^([^.]+).hbs$/.exec(filename)

  if (!matches) {
    return
  }
  let name = matches[1]
  let template = fs.readFileSync(partialsDir + '/' + filename, 'utf8')

  hbs.registerPartial(name, template)
})
// hbs.registerPartials(__dirname + '/view/components')

hbs.registerHelper('if_eq', (a, b, opts) => {
  return a.toString() === b.toString()
    ? opts.fn(this)
    : opts.inverse(this)
})

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'static')))

// session 中间件
app.use(session({
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

// flash 中间价，用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件
app.use(formidable({
  uploadDir: path.join(__dirname, 'static/img'), // 上传文件目录
  keepExtensions: true // 保留后缀
}))

// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必需的三个变量
app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// 正常请求的日志
app.use(expressWinston.logger({
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

// 路由
router(app)

// 错误请求的日志
app.use(expressWinston.errorLogger({
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

// error page
app.use((err, req, res, next) => {
  res.render('error', {
    error: err
  })
})

// if (module.parent) {
//   module.exports = app
// } else {
// 监听端口，启动程序
app.listen(config.port, () => {
  console.log(`----\n==> ✅  ${pkg.name} listening on http://localhost:${config.port}\n----`)
})
// }
