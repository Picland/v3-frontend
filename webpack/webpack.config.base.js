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
    app: [path.resolve(viewPath, 'app.js')],
    vendor: ['whatwg-fetch']
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
        }),
        exclude: path.resolve(__dirname, '../src/view/common/ui')
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        }),
        include: path.resolve(__dirname, '../src/view/common/ui')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: ['url-loader?limit=100000']
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
      _common_ui: path.resolve(viewPath, 'common/ui'),
      'variable.less': path.resolve(viewPath, 'common/style/variable.less'),
      'core.less': path.resolve(viewPath, 'common/style/core.less')
    }
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
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
