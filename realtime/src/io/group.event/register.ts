import { T_Create_Group } from '@/schema/group.event'
import { OneToOneMessage } from '@/types/message.types'

export enum groupEvent {
  create_group = 'group:create',
  create_success = 'group:create_success'
}

export type GroupDataType = {
  [groupEvent.create_group]: T_Create_Group
  [groupEvent.create_success]: { newGroupId: string }
}
