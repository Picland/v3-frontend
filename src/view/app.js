import React from 'react'
import { render } from 'react-dom'
import Store from './store'
import { Provider } from 'react-redux'
// import { syncHistoryWithStore } from 'react-router-redux'
// import createBrowserHistory from 'history/createBrowserHistory'
// import clientRouter from '../router/clientRouter'
import App from './router'
import { getUserStatus } from './common/lib/fetch'
import { initialState } from './reducer/user'
import _ from 'lodash'

async function getInitialState () {
  let result = await getUserStatus()
  if (result.code !== 0) {
    return {
      user: {
        user: result,
        logining: initialState.logining,
        message: initialState.message
      }
    }
  } else {
    return {
      user: {
        user: {},
        logining: initialState.logining,
        message: initialState.message
      }
    }
  }
}

(async () => {
  let initialState = await getInitialState()
  const store = Store(initialState) // 完整的 Redux 状态树从这里开始生成
  window.runtime = {
    userId: _.get(initialState, 'user.user._id', null)
  }
// const browserHistory = createBrowserHistory() // 将 react-router 中的 browserHistory 移到这里引入
// const history = syncHistoryWithStore(browserHistory, store) // 保证 react-router 和 Redux store 的统一

// {clientRouter2(history)}
  const renderApp = () => {
    render(
      <Provider store={store}>
        <div>
          <App />
          <div id="loading">正在加载...</div>
        </div>
      </Provider>,
        document.getElementById('root')
      )
  }
  renderApp()
  // if (__DEVELOPMENT__ && module.hot) {
  //   console.info('React Moudle/Page Replacement for Dev')
  //   module.hot.accept('./clientRouter', () => {
  //     renderApp()
  //   })
  // }
})()
