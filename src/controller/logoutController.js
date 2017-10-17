export default {
  logout (req, res, next) {
    res.clearCookie('token')
    res.json({
      'code': 0,
      'message': '已退出登录'
    })
  }
}
