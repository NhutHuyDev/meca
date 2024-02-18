import mongoose from 'mongoose'
import log from '../utils/logger'

const mongoConnector = async ({ connectionStr }: { connectionStr: string }) => {
  if (!connectionStr) {
    log.error('missing connection string')
    return
  }

  if (process.env.NODE_ENV !== 'pro') {
    mongoose.set('debug', false)
    mongoose.set('debug', { color: true })
  }

  try {
    await mongoose.connect(connectionStr)
    log.info('connected to MongoDB successfully')
  } catch (error) {
    log.error('connection to MongoDB failed')
    log.error(error)
  }
}

export { mongoConnector }
