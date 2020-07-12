require('dotenv').config()
module.exports = {
    DB,
    APP_SECRET,
    APP_REFRESH_SECRET,
    NODE_ENV,
    APP_PORT
} = process.env

module.exports.IN_PROD = NODE_ENV === 'development'