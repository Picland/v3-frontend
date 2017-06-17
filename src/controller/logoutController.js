export default {
  logout (req, res, next) {
    // 清空 session 中用户信息
    req.session.user = null
    req.flash('success', '登出成功')
    // 登出成功后跳转到登录
    res.redirect('/login')
  }
}
