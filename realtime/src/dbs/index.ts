import { mongoConnector } from '@/dbs/connectors'
import config from '@/config/index'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'dev'

const connectToDatabases = async () => {
  /**
   * @description mongo database
   */
  const mongoDbInfo = config.db.mongo

  let connectionStr = ''

  if (env === 'dev')
    connectionStr = `mongodb://${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.name}`
  else
    connectionStr = `mongodb://${mongoDbInfo.username}:${mongoDbInfo.password}@${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.name}?authSource=admin`
  await mongoConnector({ connectionStr })
}

export default connectToDatabases
