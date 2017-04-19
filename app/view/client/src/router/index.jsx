import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Frame from '../layout/Frame'
import Login from '../page/Login/Login'
import Register from '../page/Register/Register'

console.log('FrontendRouter===')

const FrontendRouter = (
  <Router>
    <div>
      <Route path='/' component={Frame} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  </Router>
)

export default FrontendRouter
