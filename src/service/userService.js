import { User } from '../model/mongo'

export default {
  // 注册一个用户
  insert (user) {
    return User.insert(user).exec()
  },

  // 通过手机号码获取用户信息
  getUserByPhone (phoneNumber) {
    return User
      .findOne({ phoneNumber: phoneNumber })
      .addCreatedAt()
      .exec()
  }
}