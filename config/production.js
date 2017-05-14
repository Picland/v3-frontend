const envPort = +process.env.PORT || 3000

const dataBaseName = 'earth-production'

module.exports = {
  port: envPort,
  session: {
    secret: dataBaseName,
    key: dataBaseName,
    maxAge: 2592000000
  },
  mongodb: `mongodb://localhost:27017/${dataBaseName}`
}
