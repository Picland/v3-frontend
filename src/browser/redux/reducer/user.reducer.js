import constActionType from '../constant/actionType'

export const initialState = {
  userInfo: {},
  otherInfo: {},
  logining: false,
  registering: false,
  logined: false
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
        userInfo: action.result,
        otherInfo: {
          id: action.result.id
        },
        logining: false,
        logined: true
      }
    case constActionType.REGISTER_SUCCESS:
      return {
        ...state,
        otherInfo: action.result,
        registering: false,
        logined: true
      }
    case constActionType.LOGIN_FAILURE:
      return {
        ...state,
        logining: false
      }
    case constActionType.REGISTER_FAILURE:
      return {
        ...state,
        registering: false
      }
    case constActionType.LOGOUT:
      return {
        userInfo: {},
        otherInfo: {},
        logining: false,
        logined: false
      }
    case constActionType.UPDATE:
      return {
        ...state,
        userInfo: action.result
      }
    case constActionType.USER_GET_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.result.user
      }
    case constActionType.UPDATE_AVATAR:
      return {
        ...state,
        otherInfo: {
          id: action.result.id,
          avatar: action.result.avatar
        }
      }
    default:
      return state
  }
}

export default user
