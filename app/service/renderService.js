import React from 'react'
import { StaticRouter as Router, Route } from 'react-router'
import render from '../view/server/serverRender'

import Frame from '../view/client/src/layout/Frame'
import Login from '../view/client/src/page/Login/Login'
import Register from '../view/client/src/page/Register/Register'

export default (url, ctx = {}) =>
  render(
    <Router context={ctx} location={url}>
      <div>
        <Route path='/' component={Frame} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </Router>
  )
