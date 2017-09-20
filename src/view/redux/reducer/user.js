import constActionType from '../constant/actionType'

export const initialState = {
  user: {},
  logining: false,
  registering: false,
  message: {}
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case constActionType.LOGIN_STARTED:
      return {
        ...state,
        logining: true
      }
    case constActionType.REGISTER_STARTED:
      return {
        ...state,
        registering: true
      }
    case constActionType.LOGIN_SUCCESS:
      return {
        user: action.result,
        logining: false,
        message: {
          _id: action.result._id
        }
      }
    case constActionType.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        message: action.result
      }
    case constActionType.LOGIN_FAILURE:
      return {
        ...state,
        logining: false,
        message: action.error
      }
    case constActionType.REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        message: action.error
      }
    case constActionType.LOGOUT:
      return {
        user: {},
        logining: false,
        message: {}
      }
    case constActionType.UPDATE:
      return {
        ...state,
        user: action.result
      }
    case constActionType.UPDATE_AVATAR:
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

export default user
