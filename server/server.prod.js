// #!/usr/bin/env node
const path = require('path')
const rootDir = path.resolve(__dirname, '..')
const fs = require('fs')

// Parse the .babelrc config file
const babelrc = fs.readFileSync(rootDir + '/.babelrc')
let config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.')
  console.error(err)
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
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
console.log('ok1')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic.config'))
  // .development()
  .server(rootDir, function () {
    console.log('ok')
    require('./main')
  })
// global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/isomorphic.config'))
//   .development(global.__DEVELOPMENT__)
//   .server(global.__DEVELOPMENT__ ? __dirname : rootDir, function () {
//     require('../app')
//   })
