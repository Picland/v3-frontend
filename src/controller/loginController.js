import sha1 from 'sha1'
import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderLoginPage (req, res, next) {
    res.status(200).send(renderService(req.url))
  },

  async login (req, res, next) {
    const {account, password} = req.body
    try {
      let user = await userService.getUserByPhone(account)
      if (!user || (sha1(password) !== user.password)) {
        return res.status(401).json({
          'code': -1,
          'message': '用户名或密码错误'
        })
      }
      // 删除密码并将用户信息写入 session
      delete user.password
      req.session.user = user
      return res.status(200).json({
        'code': 1,
        'message': '登录成功',
        'user': user
      })
    } catch (error) {
      console.log(error)
    }
  }
}
