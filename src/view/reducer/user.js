/**
 * @fileoverview the state management of user
 * @author mrgaonju@gmail.com
 */
const initialState = {
  user: {},
  logining: false,
  registering: false,
  message: {}
}

// --------------------------------------------------------------------------
// action type of USER
// --------------------------------------------------------------------------
const LOGOUT = 'LOGOUT'

const LOGIN_STARTED = 'LOGIN_STARTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

const REGISTER_STARTED = 'REGISTER_STARTED'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILURE = 'REGISTER_FAILURE'

const UPDATE = 'UPDATE'
const UPDATE_AVATAR = 'UPDATE_AVATAR'

// --------------------------------------------------------------------------
// reducer for USER
// --------------------------------------------------------------------------
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        logining: true
      }
    case REGISTER_STARTED:
      return {
        ...state,
        registering: true
      }
    case LOGIN_SUCCESS:
      return {
        user: action.result,
        logining: false
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        message: action.result
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        logining: false,
        message: action.error
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        message: action.error
      }
    case LOGOUT:
      return {
        user: {},
        logining: false,
        message: {}
      }
    case UPDATE:
      return {
        ...state,
        user: action.result
      }
    case UPDATE_AVATAR:
      return {
        ...state,
        message: {
          _id: action.result._id,
          avatar: action.result.avatar
        }
      }
    default:
      return state
  }
}

// --------------------------------------------------------------------------
// action  creators
// --------------------------------------------------------------------------

export const startLogin = () => ({
  type: LOGIN_STARTED
})

export const finishLogin = (result) => ({
  type: LOGIN_SUCCESS,
  result
})

export const loginSuccess = (message) => ({
  message: message,
  type: 'success'
})

export const failLogin = (error) => ({
  type: LOGIN_FAILURE,
  error
})

export const loginFail = (error) => ({
  message: error,
  type: 'error'
})

export const startRegister = () => ({
  type: REGISTER_STARTED
})

export const finishRegister = (result) => ({
  type: REGISTER_SUCCESS,
  result
})

export const failRegister = (error) => ({
  type: REGISTER_FAILURE,
  error
})

export const registerSuccess = (message) => ({
  message: message,
  type: 'success'
})

export const registerFail = (error) => ({
  message: error,
  type: 'error'
})

export const logout = () => ({
  type: LOGOUT
})

export const update = (result) => ({
  type: UPDATE,
  result
})

export const updateAvatar = (result) => ({
  type: UPDATE_AVATAR,
  result
})

export default user
