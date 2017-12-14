import config from './config'
import proxy from 'http-proxy-middleware'

export default (server) => {
  server.all('/api/v1/*', proxy({
    target: `http://localhost:${config.port.backend}`,
    changeOrigin: true
  }))
  server.all('/img/*', proxy({
    target: `http://localhost:${config.port.backend}`,
    changeOrigin: true
  }))
}
