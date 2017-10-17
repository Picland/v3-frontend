/**
 * JWT token管理
 */

import jwt from 'jsonwebtoken'
import config from 'config-lite'

const secretKey = config.tokenSecret

// 一般token过期策略：移动端按月，web端按周
const TOKEN_EXPIRATION = '7 days'

const secret = Buffer.from(secretKey, 'base64')

export const generateToken = payload => jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRATION })

export const verifyToken = (token, options) => {
  try {
    let payload = jwt.verify(token, secret, options)
    return payload
  } catch (err) {
    return false
  }
}

export const decodeToken = token => jwt.decode(token)

export const refreshToken = token => {
  let payload = decodeToken(token)
  // console.dir(payload)
  let newToken = null
  if (payload) {
    newToken = jwt.sign({ userId: payload.userId }, secret, { expiresIn: TOKEN_EXPIRATION })
  }
  return newToken
}

export const getToken = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer [token]
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  } else if (req.cookies && req.cookies.token) { // for page
    return req.cookies.token
  }
  return null
}

export default {
  generateToken,
  verifyToken,
  decodeToken,
  refreshToken,
  getToken
}
