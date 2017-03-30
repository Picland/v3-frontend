import React from 'react'
import {
  HashRouter,
  Route
} from 'react-router-dom'

import Demo from '../page/Demo/Demo'
import Register from '../page/Register/Register'

const frontendRouter = (
  <HashRouter>
    <div>
      <Route exact path='/' component={Demo} />
      <Route path='/register' component={Register} />
    </div>
  </HashRouter>
)

export default frontendRouter
