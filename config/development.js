const envPort = +process.env.PORT || 3000

const dataBaseName = 'earth-development'

module.exports = {
  port: envPort,
  session: {
    secret: dataBaseName,
    key: dataBaseName,
    maxAge: 604800000 // 10days
  },
  mongodb: `mongodb://localhost:27017/${dataBaseName}`
}
