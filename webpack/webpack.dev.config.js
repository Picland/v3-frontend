const webpack = require('webpack')
const merge = require('webpack-merge')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const baseWebpackConfig = require('./webpack.base.config')

const reactHMR = [
  'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
  'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&timeout=2000&reload=true',
  // 为热替换(HMR)打包好代码 only- 意味着只有成功更新运行代码才会执行热替换(HMR)
  'webpack/hot/only-dev-server'
]

baseWebpackConfig.entry.app.push(...reactHMR)
baseWebpackConfig.entry.login.push(...reactHMR)

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackIsomorphicToolsPlugin(require('./isomorphic.config.js'))
  ]
})
