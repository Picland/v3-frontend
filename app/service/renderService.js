import React from 'react'
import { StaticRouter as Router, Route } from 'react-router'
import render from '../view/serverRender'

import Frame from '../view/layout/Frame'
import Login from '../view/page/Login/Login'
import Register from '../view/page/Register/Register'

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
