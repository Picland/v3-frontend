/**
 * Create store by reducer and redux-middleware.
 *
 * @returns {Object} A Redux store that lets you read the state, dispatch
 *   actions and subscribe to changes.
 */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import createFetchMiddleware from 'redux-composable-fetch'
import ThunkMiddleware from 'redux-thunk'
import reducer from './reducer/index'

/**
 * Use middleware to make redux can parse a fair amount of actions.
 * @private
 */
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

/**
 * Combine new reducers
 * The second `routing: routerReducer` can unify router state and redux store.
 * @private
 */
const reducers = combineReducers({
  ...reducer,
  routing: routerReducer
})

// --------------------------------------------------------------------------
// Redux Middleware
// --------------------------------------------------------------------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = compose(
  composeEnhancers(
    applyMiddleware(ThunkMiddleware, FetchMiddleware)
  )
)

// --------------------------------------------------------------------------
// Create Store
// --------------------------------------------------------------------------
const store = (initialState) => createStore(reducers, initialState, enhancers)

export default store
