const path = require('path')
const rootDir = path.resolve(__dirname, '..')
const fs = require('fs')

// Parse the .babelrc config file
const babelrc = fs.readFileSync(path.join(rootDir, '../.babelrc'))
let config

try {
  config = JSON.parse(babelrc)
  delete config.presets[0][1].targets.browsers
  config.presets[0][1].targets.node = 'current'
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.\n', err)
}

// Using babel-register to do the runtime compile,
// to make Node.js support the ES6 module loading.
require('babel-register')(config)
//
// // Define some isomorphic constants.
// global.__CLIENT__ = false
// global.__SERVER__ = true
// global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
// global.__DEVTOOLS__ = global.__DEVELOPMENT__
//
// // if (__DEVELOPMENT__) {
// //   // Watching the file modify in development,
// //   // restart the server after file changed.
// //   if (!require('piping')({
// //       hook: true,
// //       ignore: /(\/\.|~$|\.json|\.css$|^node_modules\/)/i
// //     })) {
// //     return
// //   }
// // }
//
// The control interface of webpack-isomorphic-tools,
// running the project on server.
// ----------暂时关闭ssr------------------
// const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
// console.log('ok1')
// global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic.config'))
//   // .development()
//   .server(rootDir, function () {
//     console.log('ok')
//     require('./server.base')
//   })
// ----------end------------------
require('./server')
// global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic.config'))
//   .development(global.__DEVELOPMENT__)
//   .server(global.__DEVELOPMENT__ ? __dirname : rootDir, function () {
//     require('../app')
//   })
