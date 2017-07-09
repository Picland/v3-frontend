const envPort = +process.env.PORT || 3000

const dataBaseName = 'earth-sandbox'

module.exports = {
  port: envPort,
  session: {
    secret: dataBaseName,
    key: dataBaseName,
    maxAge: 604800000
  },
  mongodb: `mongodb://localhost:27017/${dataBaseName}`
}
