// import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderProfilePage (req, res, next) {
    res.status(200).send(renderService(req.url))
  },
  getUserStatus (req, res, next) {
    console.log('进入getUserStatus')
    if (req.session.user) {
      console.log('还有session')
      res.json(req.session.user)
    } else {
      res.json({
        'code': 0,
        'message': '未登录'
      })
    }
  }}
