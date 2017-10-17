import fs from 'fs'
import path from 'path'
import sha1 from 'sha1'
import userService from '../service/userService'
import tokenUtil from '../util/token'

export default {
  // getAccessToken (req, res, next) {
  //   const oldToken = tokenUtil.getToken(req)
  //   if (oldToken && tokenUtil.verifyToken(oldToken)) {
  //     res.json({accessToken: oldToken})
  //   } else {
  //     const accessToken = `Bearer ${tokenUtil.generateToken({ userId: req.headers.userid })}`
  //     res.json({accessToken})
  //   }
  // },
  async getOwnInfo (req, res, next) {
    try {
      const oldToken = tokenUtil.getToken(req)
      if (oldToken && tokenUtil.verifyToken(oldToken)) {
        // TODO: revoke old token
        const newTokent = tokenUtil.refreshToken(oldToken)
        res.cookie('token', newTokent, {httpOnly: true})
        const user = await userService.getUserById(tokenUtil.decodeToken(newTokent).userId)
        delete user.password
        res.json({
          code: 0,
          user
        })
      } else {
        res.json({
          code: -2,
          'message': '未登录'
        })
      }
    } catch (e) {
      res.json({
        'code': -1,
        'message': e.message
      })
    }
  },
  async getUserInfo (req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id)
      delete user.password
      res.json({
        code: 0,
        user
      })
    } catch (e) {
      res.json({
        'code': -1,
        'message': e.message
      })
    }
  },
  async updateUserInfo (req, res, next) {
    if (req.body.password) {
      if (req.body.newpassword1 && req.body.newpassword2) {
        let {password, newpassword1, newpassword2} = req.body
        try {
          // 基础校验
          if (password.length < 6 || password.length > 16) {
            throw new Error('密码长度须6-16位')
          }
          if (newpassword1.length < 6 || newpassword1.length > 16) {
            throw new Error('密码长度须6-16位')
          }
          if (newpassword2.length < 6 || newpassword2.length > 16) {
            throw new Error('密码长度须6-16位')
          }
          // 基础校验通过
          password = sha1(password)
          newpassword1 = sha1(newpassword1)
          newpassword2 = sha1(newpassword2)
          const user = await userService.getUserById(req.headers.userid)
          if (password !== user.password) {
            throw new Error('原密码不正确')
          }
          if (newpassword1 !== newpassword2) {
            throw new Error('两次密码输入不一致')
          }
          let result = await userService.updateUserInfo(req.headers.userid, {password: newpassword2})
          delete result.password
          res.json(result)
        } catch (e) {
          res.json({
            'code': -1,
            'message': e.message
          })
        }
      } else {
        res.json({
          'code': -1,
          'message': '请填写新密码'
        })
      }
    } else {
      try {
        let result = await userService.updateUserInfo(req.headers.userid, req.body)
        delete result.password
        res.json(result)
      } catch (e) {
        res.json({
          'code': -1,
          'message': e.message
        })
      }
    }
  },
  async updateUserAvatar (req, res, next) {
    let avatar = req.files.files
    try {
      let body = {
        avatar: avatar.path.split(path.sep).pop()
      }
      let result = await userService.updateUserInfo(req.headers.userid, body)
      delete result.password
      res.json(result)
    } catch (e) {
      // 上传头像失败，异步删除上传的头像
      avatar && avatar.path && fs.unlink(avatar.path)
      console.error(e.message)
    }
  }
}
