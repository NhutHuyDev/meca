import DEFAULT_CONFIG from './default'

const dev = {
  app: {
    port: Number(process.env.DEV_APP_PORT) || DEFAULT_CONFIG.DEV.APP_PORT,
    access_token_expiration: process.env.ACCESS_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: process.env.REFESH_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.REFESH_TOKEN_EXPIRATION
  },
  db: {
    mongo: {
      host: process.env.DEV_MONGO_HOST || DEFAULT_CONFIG.DEV.DB.MONGO.HOST,
      port: Number(process.env.DEV_MONGO_PORT) || DEFAULT_CONFIG.DEV.DB.MONGO.PORT,
      name: process.env.DEV_MONGO_NAME || DEFAULT_CONFIG.DEV.DB.MONGO.NAME
    }
  },
  smtp: {
    user: process.env.DEV_SMTP_USER || DEFAULT_CONFIG.DEV.SMTP.USER,
    pass: process.env.DEV_SMTP_PASS || DEFAULT_CONFIG.DEV.SMTP.PASS,
    host: process.env.DEV_SMTP_HOST || DEFAULT_CONFIG.DEV.SMTP.HOST,
    port: Number(process.env.DEV_SMTP_PORT) || DEFAULT_CONFIG.DEV.SMTP.PORT,
    secure: Boolean(process.env.DEV_SMTP_SECURE) || DEFAULT_CONFIG.DEV.SMTP.SECURE
  }
}

const pro = {
  app: {
    port: Number(process.env.PRO_APP_PORT) || DEFAULT_CONFIG.PRO.APP_PORT,
    access_token_expiration: process.env.ACCESS_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: process.env.REFESH_TOKEN_EXPIRATION || DEFAULT_CONFIG.DEV.REFESH_TOKEN_EXPIRATION
  },
  accessTokenPublicKey: 0,
  db: {
    mongo: {
      host: process.env.PRO_MONGO_HOST || DEFAULT_CONFIG.PRO.DB.MONGO.HOST,
      port: Number(process.env.PRO_MONGO_PORT) || DEFAULT_CONFIG.PRO.DB.MONGO.PORT,
      name: process.env.PRO_MONGO_NAME || DEFAULT_CONFIG.PRO.DB.MONGO.NAME
    }
  },
  smtp: {
    user: process.env.DEV_SMTP_USER || DEFAULT_CONFIG.DEV.SMTP.USER,
    pass: process.env.DEV_SMTP_PASS || DEFAULT_CONFIG.DEV.SMTP.PASS,
    host: process.env.DEV_SMTP_HOST || DEFAULT_CONFIG.DEV.SMTP.HOST,
    port: Number(process.env.DEV_SMTP_PORT) || DEFAULT_CONFIG.DEV.SMTP.PORT,
    secure: Boolean(process.env.DEV_SMTP_SECURE) || DEFAULT_CONFIG.DEV.SMTP.SECURE
  }
}

const env = process.env.NODE_ENV || 'dev'

const config = env === 'dev' ? dev : pro

export default config
