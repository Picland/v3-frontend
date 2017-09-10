import React from 'react'
import ReactDOM from 'react-dom'
import generateStore from './store/store'
import { Provider } from 'react-redux'
// import { syncHistoryWithStore } from 'react-router-redux'
// import createBrowserHistory from 'history/createBrowserHistory'
// import clientRouter from '../router/clientRouter'
import App from '../router/clientRouter'
// import DevTools from './layout/DevTools'
import { getUserStatus } from './common/service/fetch'
import { initialState } from './reducer/user'

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
  // const time1 = new Date()
  // console.log('1', time1)
  let initialState = await getInitialState()
  // const time2 = new Date()
  // console.log('2', (time2 - time1) / 1000)
  const store = generateStore(initialState) // 完整的 Redux 状态树从这里开始生成
  window.runtime = {
    userId: initialState.user.user && initialState.user.user._id
    // userId: '59ac077391853dd6d21fb3d1'
  }
// const browserHistory = createBrowserHistory() // 将 react-router 中的 browserHistory 移到这里引入
// const history = syncHistoryWithStore(browserHistory, store) // 保证 react-router 和 Redux store 的统一

// 用 Provider 组件作为整个应用的根组件
// {clientRouter2(history)}
  ReactDOM.render((
    <Provider store={store}>
      <div>
        <App />
        {/* <DevTools /> */}
        <div id="loading">正在加载...</div>
      </div>
    </Provider>
    ),
    document.getElementById('root')
  )
  // const time3 = new Date()
  // console.log('3', (time3 - time2) / 1000)
})()

// --------------------------------------
// React Moudle/Page Replacement for Dev
// --------------------------------------
// if (process.env.NODE_ENV === 'development' && module.hot) {
//   console.info('React Moudle/Page Replacement for Dev')
//   module.hot.accept('./container/Login/Login', () => {
//     render()
//   })
//   module.hot.accept('./container/Register/Register', () => {
//     render()
//   })
//   module.hot.accept('./layout/Header', () => {
//     render()
//   })
// }
