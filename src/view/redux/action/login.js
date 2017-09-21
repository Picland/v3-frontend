import constActionType from '../constant/actionType'
import { showFlashMessage } from '../action/flashMessage'

const startLogin = () => ({
  type: constActionType.LOGIN_STARTED
})

const finishLogin = result => ({
  type: constActionType.LOGIN_SUCCESS,
  result
})

const failLogin = () => ({
  type: constActionType.LOGIN_FAILURE
})

const loginSuccess = message => ({
  message: message,
  type: 'success'
})

const loginFail = error => ({
  message: error,
  type: 'error'
})

/**
 * Handle user login.
 *
 * @param {Object} [user] Info input by user, such as account and pwd.
 * @param {Function} [dispatch] Redux dispatch function.
 * @param {Function} [getState] Redux getState function.
 * @param {Object} [util] Redux middleware, such as fetch.
 * @returns {Object} Data responsed from server, for example:
 *   ```js
 *   {
 *     'code': 1,
 *     'message': '登录成功',
 *     'data': user
 *   }
 *   ```
 * @public
 */
export const login = user => async (dispatch, getState, util) => {
  dispatch(startLogin())
  try {
    let result = await util.api.login(user)
    if (result.code === 1) {
      dispatch(finishLogin(result.data))
      dispatch(showFlashMessage(loginSuccess(result.message)))
      // Please write here, showFlashMessage cannot get in Login because of redirect
      runtime = {
        userId: result.data._id
      }
    } else {
      dispatch(failLogin())
      dispatch(showFlashMessage(loginFail(result.message)))
    }
    return result
  } catch (e) {
    console.error(e)
  }
}
