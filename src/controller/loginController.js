import sha1 from 'sha1'
import userService from '../service/userService'
import tokenUtil from '../util/token'

export default {
  async login (req, res, next) {
    const {account, password} = req.body
    try {
      let user = await userService.getUserByPhone(account)
      if (!user || (sha1(password) !== user.password)) {
        return res.api(403, {}, {
          code: -1,
          msg: '用户名或密码错误'
        })
      }
      delete user.password
      // 客户端通过登录请求提交用户名和密码，服务端验证通过后生成一个 Token 与该用户进行关联，并将 Token 返回给客户端
      const token = tokenUtil.generateToken({ userId: user._id })
      res.cookie('token', token, {httpOnly: true})
      return res.api(user, {
        code: 0,
        msg: '登录成功'
      })
    } catch (e) {
      return res.api(403, {}, {
        code: -1,
        msg: e.message
      })
    }
  }
}
