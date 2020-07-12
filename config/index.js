const env = require('dotenv')
env.config()

module.exports = {
    DB,
    APP_PORT,
    APP_SECRET,
    APP_REFRESH_SECRET,
    NODE_ENV
} = process.env

module.exports.IN_PROD = NODE_ENV === 'development'