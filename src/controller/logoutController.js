export default {
  logout (req, res, next) {
    // 清空 session 中用户信息
    req.session.user = null
    res.json({
      'code': 0,
      'message': '已退出登录'
    })
  }
}
