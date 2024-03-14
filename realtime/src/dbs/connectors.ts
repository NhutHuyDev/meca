import mongoose from 'mongoose'

const mongoConnector = async ({ connectionStr }: { connectionStr: string }) => {
  if (!connectionStr) {
    console.log('missing connection string')
    return
  }

  // if (process.env.NODE_ENV !== 'pro') {
  //   mongoose.set('debug', false)
  //   mongoose.set('debug', { color: true })
  // }

  try {
    await mongoose.connect(connectionStr)
    console.log('connected to MongoDB successfully')
  } catch (error) {
    console.log('connection to MongoDB failed')
    console.log(error)
  }
}

export { mongoConnector }
