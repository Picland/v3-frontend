import constActionType from '../constant/actionType'

export const logout = () => ({
  type: constActionType.LOGOUT
})

/**
 * Handle user logout.
 *
 * @public
 */
export default () => async (dispatch, getState, util) => {
  try {
    let result = await util.api.logout()
    if (result.status.code === 0) {
      dispatch(logout())
      runtime.userId = null
    } else {
      throw new Error('登出失败！')
    }
  } catch (e) {
    console.error(e)
  }
}
