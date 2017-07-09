export default {
  logout (req, res, next) {
    // 清空 session 中用户信息
    req.session.user = null
    console.log('进入logout')
    console.log('req.session.user', req.session.user)
    // req.flash('success', '登出成功')
    // 登出成功后跳转到登录
    res.redirect('/login')
  }
}
