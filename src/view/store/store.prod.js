/**
 * 引入所有 reducer 和 react-middleware 来生成 store
 */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'

import createFetchMiddleware from 'redux-composable-fetch'
// 引入请求 middleware 的工厂方法
import ThunkMiddleware from 'redux-thunk'
import rootReducer from '../reducer/index'
// import * as asyncInitialState from 'redux-async-initial-state'

// 创建一个请求 middleware 的实例
// 使用 middleware, 让 Redux 可以解析各种类型的 action
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

// We need outerReducer to replace full state as soon as it loaded
// asyncInitialState.outerReducer(
const reducer = combineReducers({
  ...rootReducer,
  // We need innerReducer to store loading state, i.e. for showing loading spinner
  // If you don't need to handle loading state you may skip it
  // asyncInitialState: asyncInitialState.innerReducer,
  routing: routerReducer // 实现路由状态与 Redux store 的统一
})

// Load state function
// Should return promise that resolves application state

// compose 通过柯里+组合方式形成 pipeline 来处理数据流
// asyncInitialState.middleware(getInitialState)
const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware) // 将请求 middleware 注入 store 增强器中
)(createStore)

// 创建store
export default function (initialState) {
  return finalCreateStore(reducer, initialState)
}
