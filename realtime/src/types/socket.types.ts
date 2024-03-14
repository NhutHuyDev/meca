import { Socket } from 'socket.io'
import { User } from '@/models/user.model'

export type TCustomSocket = Socket & { user?: User & { _id?: string } }
