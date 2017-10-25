/**
 * JWT Auth Middleware
 */

import tokenUtil from '../util/token'
import renderService from '../service/renderService'

export default {
  isLogin (req, res, next) {
    const oldToken = tokenUtil.getToken(req)
    // user has logined
    if (oldToken && tokenUtil.verifyToken(oldToken)) {
      // TODO: revoke old token
      const newTokent = tokenUtil.refreshToken(oldToken)
      res.cookie('token', newTokent, {httpOnly: true})
      next()
    } else {
      // user has unlogined
      res.send(renderService(req.url))
    }
  },
  isNotLogin (req, res, next) {
    const token = tokenUtil.getToken(req)
    // user has logined
    if (token && tokenUtil.verifyToken(token)) {
      res.api(403, {}, {
        code: -1,
        msg: '已登录'
      })
    } else {
      // user has unlogined and generate token next middleare
      next()
    }
  }
  // case1: 没有过期，不刷新token
  // if (tokenUtil.verifyToken(oldToken)) {
  //   // req.accessToken = oldToken
  //   next()
  // } else if (tokenUtil.verifyToken(oldToken, {clockTolerance: 3600})) {
  //   const newToken = tokenUtil.refreshToken(oldToken)
  //   res.header('authorization', newToken)
  //   next()
  // }
  // case2: 过期小于1小时内，生成新token
  // if (tokenUtil.verifyToken(oldToken, {clockTolerance: 3600})) {
  //   const newTokent = tokenUtil.refreshToken(oldToken)
  //   res.header('authorization', newTokent)
  //   return next()
  // }
  // // case3: 过期大于等于1小时内，报token过期错误，让用户重新登录
  // if (oldToken && tokenUtil.verifyToken(oldToken)) {
  //   const newTokent = tokenUtil.refreshToken(oldToken)
  //   res.cookie('token', newTokent)
  // }
}
