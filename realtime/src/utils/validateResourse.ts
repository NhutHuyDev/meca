import { TCustomSocket } from '@/types/socket.types'
import { AnyZodObject } from 'zod'

const validateResource = (schema: AnyZodObject, data: any) => {
  try {
    schema.parse(data)
  } catch {
    throw new Error()
  }
}

export default validateResource
