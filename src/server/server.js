import path from 'path'
import express from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'
import favicon from 'serve-favicon'
// import resApi from 'res.api'
import pkg from '../../package.json'
import config from './config'
import render from './render/template'
import apiProxy from './proxy'

const server = express()

// server.use(resApi)

// --------------------------------------------------------------------------
// View Engine
// --------------------------------------------------------------------------
server.engine('.html', require('ejs').__express)
server.set('view engine', 'html')
server.use(favicon(path.join(__dirname, './static', 'favicon.ico')))

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
      filename: path.join(__dirname, './log/success.log')
    })
  ]
}))

// --------------------------------------------------------------------------
// Rest API
// --------------------------------------------------------------------------
apiProxy(server)

// --------------------------------------------------------------------------
// Turn over others page to client router and render
// --------------------------------------------------------------------------
server.use((req, res) => {
  if (!res.headersSent) {
    res.status(200).send(render(req.url))
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
      filename: path.join(__dirname, './log/error.log')
    })
  ]
}))

// --------------------------------------------------------------------------
// Start the Server
// --------------------------------------------------------------------------
server.listen(config.port.frontend, () => {
  console.log(`${pkg.name} listening on http://localhost:${config.port.frontend}`)
})
