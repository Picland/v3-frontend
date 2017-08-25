import sha1 from 'sha1'
import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderLoginPage (req, res, next) {
    res.status(200).send(renderService(req.url))
  },

  login (req, res, next) {
    const { account, password } = req.body
    userService.getUserByPhone(account)
      .then((user) => {
        if (!user) {
          res.status(401).json({
            'code': -1,
            'message': '用户名不存在'
          })
        }
        if (sha1(password) !== user.password) {
          res.status(401).json({
            'code': -1,
            'message': '密码错误'
          })
        }
        // 删除密码并将用户信息写入 session
        delete user.password
        req.session.user = user
        res.status(200).json({
          'code': 1,
          'message': '登录成功',
          'user': user
        })
      })
      .catch(next)
  }
}
