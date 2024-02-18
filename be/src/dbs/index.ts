import { mongoConnector } from '../dbs/connectors'
import config from '../config/index'

const connectToDatabases = async () => {
  /**
   * @description mongo database
   */
  const mongoDbInfo = config.db.mongo
  const connectionStr = `mongodb://${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.name}`
  await mongoConnector({ connectionStr })
}

export default connectToDatabases
