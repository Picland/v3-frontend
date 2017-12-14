export const DOMAIN = ''
const CREDENTIALS = 'include'
// const ACCESS_TOKEN_POLL_INTERVAL = 3 * 60 * 1000 // 3 minutes

// runtime = {}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
  // 'Authorization': runtime.accessToken,
  // 'X-UserId': runtime.userId
}
// const formHeaders = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
const createResult = result => {
  return result
    ? result.json()
    : {
      code: -2,
      message: '未知错误'
    }
}

// --------------------------------------------------------------------------
// AccessToken
// --------------------------------------------------------------------------
// export const pollToRefreshAccessToken = () => {
//   defaultHeaders.userId = runtime.userId
//   setInterval(() => {
//     fetch('/api/v1/accesstoken', {
//       method: 'GET',
//       headers: defaultHeaders,
//       credentials: CREDENTIALS
//     }).then(data => {
//       runtime.accessToken = data.accessToken
//       defaultHeaders.Authorization = data.accessToken
//     })
//   }, ACCESS_TOKEN_POLL_INTERVAL)
// }

// --------------------------------------------------------------------------
// Login
// --------------------------------------------------------------------------
export const login = async (data) => {
  let url = `${DOMAIN}/api/v1/login`
  let { account, password } = data
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        account: account,
        password: password
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

// --------------------------------------------------------------------------
// Register
// --------------------------------------------------------------------------
export const register = async (data) => {
  let url = `${DOMAIN}/api/v1/register`
  let { account, inviteCode, password } = data
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        account: account,
        inviteCode: inviteCode,
        password: password
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

// --------------------------------------------------------------------------
// Logout
// --------------------------------------------------------------------------
export const logout = async () => {
  let url = `${DOMAIN}/api/v1/logout`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

// --------------------------------------------------------------------------
// Check User Status
// --------------------------------------------------------------------------
export const getOwnInfo = async () => {
  let url = `${DOMAIN}/api/v1/user`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

// --------------------------------------------------------------------------
// Check User Status
// --------------------------------------------------------------------------
export const getUserInfo = async userId => {
  let url = `${DOMAIN}/api/v1/user/${userId}`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

// --------------------------------------------------------------------------
// Update User Info
// --------------------------------------------------------------------------
export const updateUserInfo = async (formData) => {
  let url = DOMAIN + '/api/v1/updateUserInfo'
  let result
  defaultHeaders.userId = runtime.userId
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(formData),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

export const checkAccount = async (account) => {
  let url = DOMAIN + '/api/checkAccount'
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        account
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

export default {
  login,
  register,
  logout,
  // getUserStatus,
  getUserInfo,
  updateUserInfo
}
