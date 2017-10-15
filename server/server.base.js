import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from 'config-lite'
import winston from 'winston'
import expressWinston from 'express-winston'
import favicon from 'serve-favicon'
import pkg from '../package.json'
import formidable from '../src/middleware/formidable'
import renderService from '../src/service/renderService'
import api from '../src/api'

const server = express()

server.use(bodyParser.json())
server.use(cookieParser())

// --------------------------------------------------------------------------
// View Engine
// --------------------------------------------------------------------------
server.engine('.html', require('ejs').__express)
server.set('views', path.join(__dirname, '../src/view'))
server.set('view engine', 'html')

// --------------------------------------------------------------------------
// Static Resource
// --------------------------------------------------------------------------
server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')))
server.use(express.static(path.join(__dirname, '../static')))

// --------------------------------------------------------------------------
// Form and File Upload Middleware
// https://github.com/felixge/node-formidable#api
// https://github.com/noraesae/express-formidable
// --------------------------------------------------------------------------
server.use(formidable({
  uploadDir: path.join(__dirname, '../static/img'),
  keepExtensions: true
}))

// --------------------------------------------------------------------------
// Success Log
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
// Router
// --------------------------------------------------------------------------
api(server)

// --------------------------------------------------------------------------
// Turn over others page to client router and render
// --------------------------------------------------------------------------
server.use((req, res) => {
  if (!res.headersSent) {
    res.status(200).send(renderService(req.url))
  }
})

// --------------------------------------------------------------------------
// Error Log
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
// Start the Server
// --------------------------------------------------------------------------
server.listen(config.port, () => {
  console.log(`----\n==> ✅  ${pkg.name} listening on http://localhost:${config.port}\n----`)
})
