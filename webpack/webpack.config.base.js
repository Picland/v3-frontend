const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const sourcePath = path.resolve(__dirname, '../src')
const viewPath = path.resolve(__dirname, '../src/view')
const outputPath = path.resolve(__dirname, '../static/dist/')

// -----------------------------------------------------------
// Find out which loader is causing this deprecation warning
// https://github.com/webpack/loader-utils/issues/56
// -----------------------------------------------------------
// process.traceDeprecation = true

module.exports = {
  entry: {
    app: [path.resolve(viewPath, 'entry.js')],
    vendor: ['react', 'react-dom', 'whatwg-fetch']
  },
  output: {
    path: outputPath,
    publicPath: outputPath,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        include: sourcePath
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]',
            'postcss-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ],
    alias: {
      'variable.less': path.resolve(viewPath, 'common/style/variable.less'),
      'core.less': path.resolve(viewPath, 'common/style/core.less')
    }
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    })
  ]
}
