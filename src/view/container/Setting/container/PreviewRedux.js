import { combineReducers } from 'redux'

// 引入 reducer 及 actionCreator
import list, { loadArticles } from '../component/Preview/PreviewListRedux'

export default combineReducers({
  list
})

export const actions = {
  loadArticles
}
