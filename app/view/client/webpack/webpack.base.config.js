const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const sourcePath = path.resolve(__dirname, '../src')
const outputPath = '/dist/'

module.exports = {
  entry: {
    app: [path.resolve(sourcePath, 'app.jsx')],
    // demo: [path.resolve(sourcePath, 'demo.jsx')],
    login: [path.resolve(sourcePath, 'login.jsx')],
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]',
          'postcss-loader',
          'less-loader'
        ]
      }
      // {
      //   test: /\.less$/,
      //   // loaders: ['css-loader', 'less-loader']
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader?modules', 'postcss-loader', 'less-loader']
      //   })
      // }
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
    new FriendlyErrorsPlugin()
  ]
}
