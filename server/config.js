const env = process.env

export default {
    gatewayUrl: env.API_GATEWAY_URL || 'http://localhost:18000',
    port: {
        frontend: env.FRONTEND_PORT || 8890,
        webpack: env.WEBPACK_PORT || 3000,
        backend: env.BACKEND_PORT || 8888
    }
}
