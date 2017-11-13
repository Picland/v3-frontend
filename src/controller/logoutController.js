export default {
  logout (req, res, next) {
    res.clearCookie('token')
    res.api({}, {
      'code': 0,
      'msg': '已退出登录'
    })
  }
}
