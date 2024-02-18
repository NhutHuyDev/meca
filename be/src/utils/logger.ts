import logger from 'pino'
import dayjs from 'dayjs'

const log = logger({
  transport: {
    target: 'pino-pretty'
  },
  level: 'info',
  base: {
    pid: false
  },
  timestamp: () => `,"At":"${dayjs().format()}"`
})

export default log
