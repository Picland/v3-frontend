import constActionType from '../constant/actionType'
import { showFlashMessage } from './flashMessage.action'

const startRegister = () => ({
  type: constActionType.REGISTER_STARTED
})

const finishRegister = (result) => ({
  type: constActionType.REGISTER_SUCCESS,
  result
})

const failRegister = (error) => ({
  type: constActionType.REGISTER_FAILURE,
  error
})

const registerSuccess = (message) => ({
  message: message,
  type: 'success'
})

const registerFail = (error) => ({
  message: error,
  type: 'error'
})

/**
 * Handle user register.
 *
 * @param {Object} [user] Info input by user, such as account and pwd.
 * @param {Function} [dispatch] Redux dispatch function.
 * @param {Function} [getState] Redux getState function.
 * @param {Object} [util] Redux middleware, such as fetch.
 * @returns {Object} Data responsed from server, for example:
 *   ```js
 *   {
 *     'code': 0,
 *     'message': '注册成功',
 *     'user': {
 *        '_id': user._id
 *     }
 *   }
 *   ```
 * @public
 */
export const register = user => async (dispatch, getState, util) => {
  dispatch(startRegister())
  try {
    let result = await util.api.register(user)
    if (result.status.code === 0) {
      dispatch(finishRegister(result.data.user))
      dispatch(showFlashMessage(registerSuccess(result.status.msg)))
    } else {
      dispatch(failRegister(result.status.msg))
      dispatch(showFlashMessage(registerFail(result.status.msg)))
    }
    return result
  } catch (e) {
    console.error(e)
  }
}
