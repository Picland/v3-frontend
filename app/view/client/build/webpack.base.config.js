const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const sourcePath = path.resolve(__dirname, '../src')
const outputPath = path.resolve(__dirname, '../../../static/dist')

module.exports = {
  entry: {
    demo : path.resolve(sourcePath, 'page/demo/demo.jsx'),
    login : path.resolve(sourcePath, 'page/login/login.jsx'),
    vendor: ['react', 'react-dom', 'whatwg-fetch']
  },
  output: {
    path: outputPath,
    publicPath: '../dist/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {cacheDirectory: true},
        include: sourcePath,
      },
      {
        test: /\.less$/,
        // loaders: ['css-loader', 'less-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 能够使用户在引入模块时不带扩展
    modules: [
      sourcePath,
      'node_modules'
    ],
    alias: {
      'variable.less': path.resolve(sourcePath, 'style/variable/index.less'),
      'core.less': path.resolve(sourcePath, 'style/core.less')
    }
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
  ]
}