import {
  TCreateNewGroupSchema,
  createNewGroupSchema
} from '@/lib/formSchema/createNewGroup'
import { useForm, Controller, UseFormSetValue } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ScrollArea from '@/components/ScrollArea'
import Divider from '@/components/ui/Divider'
import { Chat_List } from '@/data/index'
import { ChangeEvent, useEffect, useState } from 'react'
import { TUser, filterSelectedUsers, filterUserContacts } from '@/utils'
import { X } from 'phosphor-react'

function CreateNewGroup({
  setOpenDialog
}: {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
    reset,
    control
  } = useForm<TCreateNewGroupSchema>({
    defaultValues: {
      groupName: '',
      members: []
    },
    resolver: zodResolver(createNewGroupSchema)
  })

  const onSubmit = async (data: TCreateNewGroupSchema) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 4000))

    console.log(data)

    reset()

    setOpenDialog(false)
  }

  const [contactList, setContactList] = useState<TUser[]>(Chat_List)
  const [contactSearch, setContactSearch] = useState('')
  const [hiddenMemberList, setHiddenMemberList] = useState(true)

  const handleSearchContactInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchContactList = filterUserContacts(e.target.value, Chat_List)
    setContactList(searchContactList)
    setContactSearch(e.target.value)
  }

  return (
    <form className='w-[550px]' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('groupName')}
        placeholder='enter your group name'
        className='p-3 rounded-2xl border-2 border-grey-500 w-full outline-none my-3'
      />
      {errors.groupName && (
        <p className='text-left text-error-main'>{`${errors.groupName.message}`}</p>
      )}

      <Divider rootStyle='my-3 w-full' />

      <div>
        <div>
          <div
            className={`flex ${
              errors.members ? 'justify-between' : 'justify-start'
            } items-center mb-3`}
          >
            <input
              type='text'
              value={contactSearch}
              onChange={handleSearchContactInputChange}
              placeholder='search your contact ...'
              style={{
                borderBottomWidth: '1px'
              }}
              className='p-2 w-44 outline-none border-grey-300'
            />
            {errors.members && (
              <p className='text-left text-error-main'>{`${errors.members.message}`}</p>
            )}
          </div>

          <div className='grid grid-cols-12 overflow-hidden p-4'>
            <div className={hiddenMemberList ? 'col-span-12' : 'col-span-6'}>
              <p className='font-semibold mb-3'>Choose members</p>

              <ScrollArea maxHeight='350px'>
                <div className='p-2 h-full space-y-5'>
                  <Controller
                    name='members'
                    control={control}
                    render={({ field }) => (
                      <>
                        {contactList.map((user) => (
                          <MemberSelection
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            avatarUrl={user.img}
                            setValue={setValue}
                            members={field.value}
                            isSubmitted={isSubmitted}
                            setHiddenMemberList={setHiddenMemberList}
                          />
                        ))}
                      </>
                    )}
                  />
                </div>
              </ScrollArea>
            </div>

            <div className='col-span-6' hidden={hiddenMemberList}>
              <div className='w-fit ml-auto'>
                <p className='font-semibold mb-3'>Member list</p>
                <div className='ring-1 ring-grey-500 rounded-lg p-1'>
                  <ScrollArea maxHeight='300px'>
                    <div className='p-2 h-full space-y-2'>
                      <Controller
                        name='members'
                        control={control}
                        render={({ field }) => (
                          <>
                            {filterSelectedUsers(field.value, Chat_List).map(
                              (user) => (
                                <MemberSelected
                                  key={user.id}
                                  id={user.id}
                                  name={user.name}
                                  avatarUrl={user.img}
                                  setValue={setValue}
                                  members={field.value}
                                  isSubmitted={isSubmitted}
                                  setHiddenMemberList={setHiddenMemberList}
                                />
                              )
                            )}
                          </>
                        )}
                      />
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center font-semibold px-3 pt-3'>
        <button
          type='button'
          className='text-error-main '
          onClick={() => {
            setOpenDialog(false)
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className='text-secondary-main disabled:opacity-75'
        >
          Create
        </button>
      </div>
    </form>
  )
}

function MemberSelection({
  id,
  name,
  avatarUrl,
  members,
  setValue,
  isSubmitted,
  setHiddenMemberList
}: {
  id: number
  name: string
  avatarUrl?: string
  members: string[]
  setValue: UseFormSetValue<TCreateNewGroupSchema>
  isSubmitted: boolean
  setHiddenMemberList: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const bgUrl = `url(${avatarUrl})`

  const [checked, setchecked] = useState(members.includes(id.toString()))

  useEffect(() => {
    setchecked(members.includes(id.toString()))
  }, [members, id])

  const handleBtnClick = () => {
    const isMemeber = members.includes(id.toString())
    const newMembers = members

    if (!checked && !isMemeber) {
      newMembers.push(id.toString())
    }

    if (checked && isMemeber) {
      const removeId = newMembers.indexOf(id.toString())
      removeId > -1 && newMembers.splice(removeId, 1)
    }

    setValue('members', newMembers, { shouldValidate: isSubmitted })

    setHiddenMemberList(newMembers.length > 0 ? false : true)

    setchecked(!checked)
  }

  return (
    <button
      type='button'
      className='flex justify-center items-center gap-4 w-fit outline-none'
      onClick={handleBtnClick}
    >
      <div
        style={{
          padding: '2px'
        }}
        className='rounded-full h-4 w-4 cursor-pointer 
          ring-1 ring-grey-600 flex justify-center items-center'
      >
        <div
          style={{
            height: '10px',
            width: '10px'
          }}
          className={`rounded-full ${checked && 'bg-secondary-main'}`}
        ></div>
      </div>
      <div
        className='flex-shrink-0 h-9 w-9 rounded-3xl
        bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: bgUrl }}
      ></div>
      <p>{name}</p>
    </button>
  )
}

function MemberSelected({
  id,
  name,
  avatarUrl,
  members,
  setValue,
  isSubmitted,
  setHiddenMemberList
}: {
  id: number
  name: string
  avatarUrl?: string
  members: string[]
  setValue: UseFormSetValue<TCreateNewGroupSchema>
  isSubmitted: boolean
  setHiddenMemberList: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const bgUrl = `url(${avatarUrl})`

  const handleBtnClick = () => {
    const isMemeber = members.includes(id.toString())
    const newMembers = members

    if (isMemeber) {
      const removeId = newMembers.indexOf(id.toString())
      removeId > -1 && newMembers.splice(removeId, 1)
    }

    setValue('members', newMembers, { shouldValidate: isSubmitted })

    setHiddenMemberList(newMembers.length > 0 ? false : true)
  }

  return (
    <div className='flex justify-center items-center gap-3 w-fit outline-none p-1 px-3 bg-secondary-light rounded-3xl'>
      <div
        className='flex-shrink-0 h-9 w-9 rounded-3xl
        bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: bgUrl }}
      ></div>
      <p className='w-20 truncate'>{name}</p>
      <button
        type='button'
        style={{
          padding: '2px'
        }}
        onClick={handleBtnClick}
        className='rounded-full cursor-pointer 
          bg-secondary-dark hover:bg-secondary-darker flex justify-center items-center'
      >
        <X className='font-bold text-secondary-light text-sm' weight='bold' />
      </button>
    </div>
  )
}

export default CreateNewGroup
