const app = require('./src/app')
const {
  app: { port }
} = require('./src/configs')

const server = app.listen(port, () => {
  console.log(`meca be started with ${port}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log('Exit Server Express'))
})
