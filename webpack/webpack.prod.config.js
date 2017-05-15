const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new WebpackIsomorphicToolsPlugin(require('./isomorphic.config.js'))
  ]
})
