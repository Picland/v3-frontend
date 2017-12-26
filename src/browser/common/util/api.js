import Rest from './Rest'

/**
 * Login.
 *
 * @public
 * @param {object} [data] account and password.
 * @return {promise} Rest Promise.
 */
const login = data => {
  const { account, password } = data
  return Rest.req().path('api/v1/login').post({ account, password })
}

/**
 * Register.
 *
 * @public
 * @param {object} [data] account, inviteCode and password.
 * @return {promise} Rest Promise.
 */
const register = data => {
  const { account, inviteCode, password } = data
  return Rest.req().path('api/v1/register').post({ account, inviteCode, password })
}

/**
 * Logout.
 *
 * @public
 * @return {promise} Rest Promise.
 */
const logout = () => Rest.req().path('api/v1/logout').get()

/**
 * Get current user info.
 *
 * @public
 * @return {promise} Rest Promise.
 */
const getOwnInfo = () => Rest.req().path('api/v1/user').get()

/**
 * Get other user info.
 *
 * @public
 * @return {promise} Rest Promise.
 */
const getUserInfo = userId => Rest.req().path(`api/v1/user/${userId}`).get()

/**
 * update current user info.
 *
 * @public
 * @param {object} [formData]
 * @return {promise} Rest Promise.
 */
const updateUserInfo = formData =>
  Rest.req().path('api/v1/updateUserInfo').header('userId', runtime.userId).post(formData)

/**
 * @interface
 */
export {
  login,
  register,
  logout,
  getUserInfo,
  getOwnInfo,
  updateUserInfo
}
