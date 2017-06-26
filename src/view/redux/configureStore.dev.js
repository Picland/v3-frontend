import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'

import createFetchMiddleware from 'redux-composable-fetch'
// 引入请求 middleware 的工厂方法
import ThunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
import DevTools from './DevTools'

// 创建一个请求 middleware 的实例
const FetchMiddleware = createFetchMiddleware({
  afterFetch ({ action, result }) {
    return result.json().then(data => {
      return Promise.resolve({
        action,
        result: data
      })
    })
  }
})

const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware), // 将请求 middleware 注入 store 增强器中
  DevTools.instrument()
)(createStore)

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer
})

export default function configureStore (initialState) {
  const store = finalCreateStore(reducer, initialState)

  return store
}
