import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Frame from '../view/layout/Frame'
import Login from '../view/container/Login'
import Register from '../view/component/Register/Register'
import Setting from '../view/container/Setting/Setting'
import Detail from '../view/container/Setting/Detail'
import Preview from '../view/container/Setting/Preview'

console.log('ClientRouter===')

const ClientRouter = history => (
  <Router history={history}>
    <Route path="/" render={() =>
      <Frame>
        <Switch>
          <Login path="/login" />
          <Register path="/register" />
          <Route path="/settings" render={() =>
            <Setting>
              <Switch>
                <Preview path="/settings/preview" />
                <Detail path="/settings/detail/:id" />
              </Switch>
            </Setting>
          } />
        </Switch>
      </Frame>
    } />
  </Router>
)

export default ClientRouter
