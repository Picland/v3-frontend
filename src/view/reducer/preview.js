/**
 * 主要暴露出 reducer 函数和 actionCreator 函数
 */

// 作为previewList这个reducer函数中state的默认值
// 只是为了初始化Redux并确定每个reducer的结构，只在初始的时候用到
const initialState = {
  loading: true,
  error: false,
  articleList: []
}

// constants, 即 action 中的 type 字段
// 用来标识 action
const LOAD_ARTICLES = 'LOAD_ARTICLES'
const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS'
const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR'

// reducer(oldState, action) => newState
function preview (state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES: {
      return {
        ...state,
        loading: true,
        error: false
      }
    }

    case LOAD_ARTICLES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        articleList: action.payload
      }
    }

    case LOAD_ARTICLES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }

    default:
      return state
  }
}

// actionCreator, 返回一个 action
// 格式由 redux-composable-fetch 这个 middleware 定义
export const loadArticles = () => ({
  types: [LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_ERROR],
  url: '/api/articles.json'
})

export default preview
