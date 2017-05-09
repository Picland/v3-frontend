import fs from 'fs'
import path from 'path'
import sha1 from 'sha1'
import userService from '../service/userService'
import renderService from '../service/renderService'

export default {
  renderRegisterPage (req, res, next) {
    // res.render('register')
    res.status(200).send(renderService(req.url))
  },

  createUser (req, res, next) {
    let phoneNumber = req.fields.phoneNumber
    let name = req.fields.name
    let gender = req.fields.gender
    let bio = req.fields.bio || ''
    let avatar = req.files.avatar.path.split(path.sep).pop()
    let password = req.fields.password
    let repassword = req.fields.repassword
    let inviteCode = req.fields.inviteCode

    // 校验参数
    try {
      if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
        throw new Error('请输入正确的手机号码')
      }
      if (!(name.length >= 1 && name.length <= 10)) {
        throw new Error('名字请限制在 1-10 个字符')
      }
      if (!['m', 'f', 'x'].includes(gender)) {
        throw new Error('性别只能是男、女或保密')
      }
      if (!(bio.length >= 0 && bio.length <= 30)) {
        throw new Error('个人简介请限制在 1-30 个字符')
      }
      if (!req.files.avatar.name) {
        throw new Error('缺少头像')
      }
      if (inviteCode !== 'TCAEVu32018') {
        throw new Error('无效的邀请码')
      }
      if (password.length < 6) {
        throw new Error('密码至少 6 个字符')
      }
      if (password !== repassword) {
        throw new Error('两次输入密码不一致')
      }
    } catch (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      req.flash('error', e.message)
      return res.redirect('/register')
    }

    // 明文密码加密
    password = sha1(password)

    // 待写入数据库的用户信息
    let user = {
      phoneNumber,
      name,
      password,
      gender,
      bio,
      avatar
    }
    // 用户信息写入数据库
    userService.insert(user)
      .then((result) => {
        // 此 user 是插入 mongodb 后的值，包含 _id
        user = result.ops[0]
        // 将用户信息存入 session
        delete user.password
        req.session.user = user
        // 写入 flash
        req.flash('success', '注册成功')
        // 跳转到首页
        res.redirect('/articles')
      })
      .catch((e) => {
        // 注册失败，异步删除上传的头像
        fs.unlink(req.files.avatar.path)
        // 用户名被占用则跳回注册页，而不是错误页
        if (e.message.match('E11000 duplicate key')) {
          req.flash('error', '用户名已被占用')
          return res.redirect('/register')
        }
        next(e)
      })
  }
}
