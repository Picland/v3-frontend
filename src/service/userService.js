import { User } from '../model/mongo'

export default {
  // 注册一个用户
  async insert (user) {
    return User.insert(user).exec()
  },

  // 通过手机号码获取用户信息
  async getUserByPhone (phoneNumber) {
    return User
      .findOne({ phoneNumber: phoneNumber })
      .addCreatedAt()
      .exec()
  },

  // 根据用户ID修改用户信息
  async updateUserInfo (userId, data) {
    await User.update({_id: userId}, { $set: data }).exec()
    return User.findOne({ _id: userId }).exec()
  }
}
