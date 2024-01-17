const defaultConfig = {
    APP_PORT: 8000,
    MONGO_HOST: '127.0.0.1',
    MONGO_PORT: 27017,
    MONGO_NAME: 'meca',
}

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || defaultConfig.APP_PORT,
    },
    mongo_db: {
        host: process.env.DEV_MONGO_HOST || defaultConfig.MONGO_HOST,
        port: process.env.DEV_MONGO_PORT || defaultConfig.MONGO_PORT,
        name: process.env.DEV_MONGO_NAME || defaultConfig.MONGO_NAME,
    },
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || defaultConfig.APP_PORT,
    },
    mongo_db: {
        host: process.env.PRO_MONGO_HOST || defaultConfig.MONGO_HOST,
        port: process.env.PRO_MONGO_PORT || defaultConfig.MONGO_PORT,
        name: process.env.PRO_MONGO_NAME || defaultConfig.MONGO_NAME,
    },
}

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
