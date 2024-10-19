import DEFAULT_CONFIG from './default'
import dotenv from 'dotenv'

dotenv.config()

const dev = {
  app: {
    port: Number(process.env.DEV_APP_PORT) || DEFAULT_CONFIG.DEV.APP_PORT,
    access_token_expiration:
      process.env.ACCESS_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration:
      process.env.REFESH_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.REFESH_TOKEN_EXPIRATION
  },
  db: {
    mongo: {
      host: process.env.DEV_MONGO_HOST || DEFAULT_CONFIG.DEV.DB.MONGO.HOST,
      port: Number(process.env.DEV_MONGO_PORT) || DEFAULT_CONFIG.DEV.DB.MONGO.PORT,
      name: process.env.DEV_MONGO_NAME || DEFAULT_CONFIG.DEV.DB.MONGO.NAME,
      username: process.env.DEV_MONGO_USERNAME || DEFAULT_CONFIG.DEV.DB.MONGO.USERNAME,
      password: process.env.DEV_MONGO_PASSWORD || DEFAULT_CONFIG.DEV.DB.MONGO.PASSWORD
    }
  },
  smtp: {
    user: process.env.ADMIN_EMAIL_ADDRESS,
    clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
    clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN
  }
}

const pro = {
  app: {
    port: Number(process.env.PRO_APP_PORT) || DEFAULT_CONFIG.PRO.APP_PORT,
    access_token_expiration:
      process.env.ACCESS_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration:
      process.env.REFESH_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.REFESH_TOKEN_EXPIRATION
  },
  accessTokenPublicKey: 0,
  db: {
    mongo: {
      host: process.env.PRO_MONGO_HOST || DEFAULT_CONFIG.PRO.DB.MONGO.HOST,
      port: Number(process.env.PRO_MONGO_PORT) || DEFAULT_CONFIG.PRO.DB.MONGO.PORT,
      name: process.env.PRO_MONGO_NAME || DEFAULT_CONFIG.PRO.DB.MONGO.NAME,
      username: process.env.PRO_MONGO_USERNAME || DEFAULT_CONFIG.PRO.DB.MONGO.USERNAME,
      password: process.env.PRO_MONGO_PASSWORD || DEFAULT_CONFIG.PRO.DB.MONGO.PASSWORD
    }
  },
  smtp: {
    user: process.env.ADMIN_EMAIL_ADDRESS,
    clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
    clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN
  }
}

const env = process.env.NODE_ENV || 'dev'

const config = env === 'dev' ? dev : pro

export default config
