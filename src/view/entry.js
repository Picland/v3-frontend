import React from 'react'
import ReactDOM from 'react-dom'
import generateStore from './store/store'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import clientRouter from '../router/clientRouter'
import DevTools from './component/DevTools/DevTools'

const store = generateStore() // 完整的 Redux 状态树从这里开始生成
const browserHistory = createBrowserHistory() // 将 react-router 中的 browserHistory 移到这里引入
const history = syncHistoryWithStore(browserHistory, store) // 保证 react-router 和 Redux store 的统一

// 用 Provider 组件作为整个应用的根组件
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
