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
require('../app')
