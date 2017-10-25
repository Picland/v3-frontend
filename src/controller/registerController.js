import path from 'path'
import sha1 from 'sha1'
import userService from '../service/userService'
import tokenUtil from '../util/token'

export default {
  async createUser (req, res, next) {
    let phoneNumber = req.body.account
    let inviteCode = req.body.inviteCode
    let password = req.body.password
    let name = req.body.name || ''
    let gender = req.body.gender || 'x'
    let bio = req.body.bio || ''
    let avatar
    let email = ''
    // let avatar = req.files.avatar
    // let repassword = req.body.repassword

    // 校验参数
    try {
      if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
        throw new Error('请输入正确的手机号码')
      }
      // if (!(name.length >= 1 && name.length <= 10)) {
      //   throw new Error('名字请限制在 1-10 个字符')
      // }
      // if (!['m', 'f', 'x'].includes(gender)) {
      //   throw new Error('性别只能是男、女或保密')
      // }
      // if (!(bio.length >= 0 && bio.length <= 30)) {
      //   throw new Error('个人简介请限制在 1-30 个字符')
      // }
      if (!avatar) {
        avatar = 'default_avatar.jpg'
        // throw new Error('缺少头像')
      } else {
        avatar = avatar.path.split(path.sep).pop()
      }
      if (inviteCode !== 'TCAEVu32018') {
        throw new Error('无效的邀请码')
      }
      if (password.length < 6 || password.length > 16) {
        throw new Error('密码长度须6-16位')
      }
      // if (password !== repassword) {
      //   throw new Error('两次输入密码不一致')
      // }
    } catch (e) {
      // 注册失败，异步删除上传的头像
      // avatar && avatar.path && fs.unlink(req.files.avatar.path)
      return res.api(403, {}, {
        code: -1,
        msg: e.message
      })
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
      avatar,
      email
    }
    try {
      let result = await userService.insert(user)
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      delete user.password
      const token = tokenUtil.generateToken({ userId: user._id })
      res.cookie('token', token, {httpOnly: true})
      return res.api(201, {user: {'_id': user._id}}, {
        code: 0,
        msg: '注册成功'
      })
    } catch (e) {
      // 注册失败，异步删除上传的头像
      // req.files.avatar && fs.unlink(req.files.avatar.path)
      if (e.message.match('E11000 duplicate key')) {
        return res.api(403, {}, {
          code: -1,
          msg: '账号已经被注册'
        })
      }
      next(e)
    }
  }
}
