import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Frame from './layout/Frame'
import Login from './page/Login/Login'
import Register from './page/Register/Register'
import Setting from './page/Setting/Setting'
import Profile from './page/Setting/Profile/Profile'

console.log('ViewRouter===')

const ViewRouter = (
  <Router>
    <div>
      <Route path="/" render={() =>
        <Frame>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/settings" render={() =>
              <Setting>
                <Route path="/settings/profile" component={Profile} />
              </Setting>
            } />
          </Switch>
        </Frame>
      } />
    </div>
  </Router>
)

export default ViewRouter
