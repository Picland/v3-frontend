const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const sourcePath = path.resolve(__dirname, '../app')
const outputPath = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    server: path.resolve(__dirname, '../app.dev.js')
  },
  output: {
    path: outputPath,
    publicPath: outputPath,
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'], // 能够使用户在引入模块时不带扩展
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  externals: nodeExternals(),
  devtool: 'source-map',
  plugins: [
    new FriendlyErrorsPlugin()
  ]
}
