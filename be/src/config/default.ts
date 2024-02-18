const DEFAULT_CONFIG = {
  DEV: {
    APP_PORT: 8080,
    ACCESS_TOKEN_EXPIRATION: '1 days',
    REFESH_TOKEN_EXPIRATION: '90 days',
    DB: {
      MONGO: {
        HOST: '127.0.0.1',
        PORT: 27017,
        NAME: 'AuthMongoDev'
      }
    },
    SMTP: {
      USER: 'aebdaumtczexbb3j@ethereal.email',
      PASS: 'u9eJkvfSwUMKwgbqGK',
      HOST: 'smtp.ethereal.email',
      PORT: 587,
      SECURE: false
    }
  },

  PRO: {
    APP_PORT: 8080,
    ACCESS_TOKEN_EXPIRATION: '1 days',
    REFESH_TOKEN_EXPIRATION: '90 days',
    DB: {
      MONGO: {
        HOST: '127.0.0.1',
        PORT: 27017,
        NAME: 'AuthMongoPro'
      }
    },
    SMTP: {
      USER: 'aebdaumtczexbb3j@ethereal.email',
      PASS: 'u9eJkvfSwUMKwgbqGK',
      HOST: 'smtp.ethereal.email',
      PORT: 587,
      SECURE: false
    }
  }
}

export default DEFAULT_CONFIG
