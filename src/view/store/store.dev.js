/**
 * 引入所有 reducer 和 react-middleware 来生成 store
 */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'

import createFetchMiddleware from 'redux-composable-fetch'
// 引入请求 middleware 的工厂方法
import ThunkMiddleware from 'redux-thunk'
import rootReducer from '../reducer/index'
import DevTools from '../component/DevTools/DevTools'

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

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer // 实现路由状态与 Redux store 的统一
})

// compose 通过柯里+组合方式形成 pipeline 来处理数据流
const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware), // 将请求 middleware 注入 store 增强器中
  DevTools.instrument()  // 先执行，从右到左，左倾
)(createStore)

// 创建store
export default function (initialState) {
  return finalCreateStore(reducer, initialState)
}
