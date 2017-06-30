import sha1 from 'sha1'
import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderLoginPage (req, res, next) {
    res.status(200).send(renderService(req.url))
  },

  login (req, res, next) {
    let phoneNumber = req.fields.phoneNumber
    let password = req.fields.password

    userService.getUserByPhone(phoneNumber)
      .then((user) => {
        if (!user) {
          req.flash('error', '用户不存在')
          return res.redirect('back')
        }
        // 检查密码是否匹配
        if (sha1(password) !== user.password) {
          req.flash('error', '用户名或密码错误')
          return res.redirect('back')
        }
        req.flash('success', '登录成功')
        // 用户信息写入 session
        delete user.password
        req.session.user = user
        // 跳转到主页
        res.redirect('/settings/preview')
      })
      .catch(next)
  }
}
// module.exports = () => {
//   class LoginController {
//     renderLoginPage(req, res, next) {
//       res.render('login')
//     }
//     login(req, res, next) {
//       let name = req.fields.name
//       let password = req.fields.password
//
//       userService.getUserByName(name)
//         .then((user) => {
//           if (!user) {
//             req.flash('error', '用户不存在')
//             return res.redirect('back')
//           }
//           // 检查密码是否匹配
//           if (sha1(password) !== user.password) {
//             req.flash('error', '用户名或密码错误')
//             return res.redirect('back')
//           }
//           req.flash('success', '登录成功')
//           // 用户信息写入 session
//           delete user.password
//           req.session.user = user
//           // 跳转到主页
//           res.redirect('/posts')
//         })
//         .catch(next)
//     }
//   }
//   return LoginController
// }
