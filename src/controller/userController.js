import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderProfilePage (req, res, next) {
    res.status(200).send(renderService(req.url))
  },
  getUserStatus (req, res, next) {
    if (req.session.user) {
      userService.getUserByPhone(req.session.user.phoneNumber)
        .then((user) => {
          delete user.password
          res.json(user)
        })
    } else {
      res.json({
        'code': 0,
        'message': '未登录'
      })
    }
  },
  async updateUserInfo (req, res, next) {
    try {
      let result = await userService.updateUserInfo(req.headers.userid, req.body)
      delete result.password
      res.json(result)
    } catch (error) {
      console.error(error)
    }
  }
}
