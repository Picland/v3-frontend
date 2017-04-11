import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Frame from '../layout/Frame'
import Login2 from '../page/Login/Login'
import Register from '../page/Register/Register'

const frontendRouter = (
  <Router>
    <div>
      <Route path='/' component={Frame} />
      <Route exact path='/' component={Login2} />
      <Route path='/register' component={Register} />
    </div>
  </Router>
)

export default frontendRouter
