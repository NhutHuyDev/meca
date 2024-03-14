import DEFAULT_CONFIG from './default'
import dotenv from 'dotenv'

dotenv.config()

const dev = {
  app: {
    port: Number(process.env.DEV_APP_PORT) || DEFAULT_CONFIG.DEV.APP_PORT
  },
  db: {
    mongo: {
      host: process.env.DEV_MONGO_HOST || DEFAULT_CONFIG.DEV.DB.MONGO.HOST,
      port: Number(process.env.DEV_MONGO_PORT) || DEFAULT_CONFIG.DEV.DB.MONGO.PORT,
      name: process.env.DEV_MONGO_NAME || DEFAULT_CONFIG.DEV.DB.MONGO.NAME,
      username: process.env.DEV_MONGO_USERNAME || DEFAULT_CONFIG.DEV.DB.MONGO.USERNAME,
      password: process.env.DEV_MONGO_PASSWORD || DEFAULT_CONFIG.DEV.DB.MONGO.PASSWORD
    }
  }
}

const pro = {
  app: {
    port: Number(process.env.PRO_APP_PORT) || DEFAULT_CONFIG.PRO.APP_PORT
  },
  db: {
    mongo: {
      host: process.env.PRO_MONGO_HOST || DEFAULT_CONFIG.PRO.DB.MONGO.HOST,
      port: Number(process.env.PRO_MONGO_PORT) || DEFAULT_CONFIG.PRO.DB.MONGO.PORT,
      name: process.env.PRO_MONGO_NAME || DEFAULT_CONFIG.PRO.DB.MONGO.NAME,
      username: process.env.PRO_MONGO_USERNAME || DEFAULT_CONFIG.PRO.DB.MONGO.USERNAME,
      password: process.env.PRO_MONGO_PASSWORD || DEFAULT_CONFIG.PRO.DB.MONGO.PASSWORD
    }
  }
}

const env = process.env.NODE_ENV || 'dev'

const config = env === 'dev' ? dev : pro

export default config
