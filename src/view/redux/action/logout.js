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
    result.code === 0 && dispatch(logout())
    if (result.code === -2) throw new Error('登出失败！')
  } catch (e) {
    console.error(e)
  }
}
