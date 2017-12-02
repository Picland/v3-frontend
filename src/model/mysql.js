import Sequelize from 'sequelize'
import config from 'config-lite'

const { database, username, password, host } = config.mysql
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false
  }
})

const User = sequelize.define('user', {
  phoneNumber: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  password: Sequelize.STRING(50),
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  avatar: Sequelize.STRING(100),
  bio: Sequelize.STRING(100),
  email: Sequelize.STRING(100),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT
})

export {
  User
}
