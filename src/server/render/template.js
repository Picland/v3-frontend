// import React from 'react'
// import { StaticRouter as Router, Route } from 'react-router'

// import { renderToString } from 'react-dom/server'
// <div id="root">${renderToString(renderMe)}</div>
import pkg from '../../../package.json'
import config from '../config'

const reactVersion = '16.0.0' || pkg.dependencies.react.slice(1)

const NODE_ENV = process.env.NODE_ENV

const dist = NODE_ENV === 'development'
  ? `http://localhost:${config.port.webpack}/dist`
  : '/dist'

const render = (renderMe) => {
  if (NODE_ENV === 'development') {
    return `<!DOCTYPE html>
      <html lang="zh-cn">
        <head>
          <meta charset="UTF-8">
          <title>木纹子印象派</title>
          <link rel="stylesheet" href="${dist}/css/app.css">
        </head>
        <body>
          <div id="root"></div>
          <script src="https://cdn.bootcss.com/react/${reactVersion}/umd/react.production.min.js"></script>
          <script src="https://cdn.bootcss.com/react-dom/${reactVersion}/umd/react-dom.production.min.js"></script>
          <script src="${dist}/js/vendor.js"></script>
          <script src="${dist}/js/app.js"></script>
        </body>
      </html>`
  } else {
    return `<!DOCTYPE html>
      <html lang="zh-cn">
        <head>
          <meta charset="UTF-8">
          <title>木纹子印象派</title>
          <link rel="stylesheet" href="${dist}/css/app.css">
        </head>
        <body>
          <div id="root"></div>
          <script src="https://cdn.bootcss.com/react/${reactVersion}/umd/react.production.min.js"></script>
          <script src="https://cdn.bootcss.com/react-dom/${reactVersion}/umd/react-dom.production.min.js"></script>
          <script src="${dist}/js/vendor.js"></script>
          <script src="${dist}/js/app.js"></script>
        </body>
      </html>`
  }
}

// import Frame from '../view/layout/Frame'
// import Login from '../view/page/Login/Login'
// import Register from '../view/page/Register/Register'

// const NODE_ENV = process.env.NODE_ENV

export default (url, ctx = {}) => {
  // if (NODE_ENV === 'development') {
  return render()
  // }
  // else {
  //   return render(
  //     <Router context={ctx} location={url}>
  //       <div>
  //         <Route path='/' component={Frame} />
  //         <Route path='/login' component={Login} />
  //         <Route path='/register' component={Register} />
  //       </div>
  //     </Router>
  //   )
  // }
}
