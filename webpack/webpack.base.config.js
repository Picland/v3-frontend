const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const sourcePath = path.resolve(__dirname, '../app/view')
const outputPath = path.resolve(__dirname, '../static/dist/')

module.exports = {
  entry: {
    app: [path.resolve(sourcePath, 'entry.jsx')],
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
    })
  ]
}
