import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Frame from '../layout/Frame'
import Login from '../page/Login/Login'
import Register from '../page/Register/Register'

const FrontendRouter = (
  <Router>
    <div>
      <Route path='/' component={Frame} />
      <Route exact path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  </Router>
)

export default FrontendRouter
