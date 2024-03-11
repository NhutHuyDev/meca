import { mongoConnector } from '../dbs/connectors'
import config from '../config/index'

const connectToDatabases = async () => {
  /**
   * @description mongo database
   */
  const mongoDbInfo = config.db.mongo
  // const connectionStr = `mongodb://${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.name}`
  const connectionStr = `mongodb://${mongoDbInfo.username}:${mongoDbInfo.password}@${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.name}?authSource=admin`
  // const connectionStr = `mongodb://root:root@${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.name}`
  await mongoConnector({ connectionStr })
}

export default connectToDatabases
