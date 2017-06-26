import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import clientRouter from '../router/clientRouter'
import DevTools from './redux/DevTools'

const store = configureStore()
const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, store)

function render () {
  ReactDOM.render((
    <Provider store={store}>
      <div>
        {clientRouter(history)}
        <DevTools />
      </div>
    </Provider>
    ),
    document.getElementById('root')
  )
}

render()

// --------------------------------------
// React Moudle/Page Replacement for Dev
// --------------------------------------
if (process.env.NODE_ENV === 'development' && module.hot) {
  console.info('React Moudle/Page Replacement for Dev')
  module.hot.accept('./container/Login/Login', () => {
    render()
  })
  module.hot.accept('./container/Register/Register', () => {
    render()
  })
  module.hot.accept('./layout/Header', () => {
    render()
  })
}
