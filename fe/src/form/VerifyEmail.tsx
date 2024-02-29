// import {
//   TRequestVerifyOtpSchema,
//   requestVerifyOtpSchema
// } from '@/lib/formSchema/requestVerifyOtp'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useAppDispatch } from '@//hooks/redux'
// import {
//   TForgotPasswordResquest,
//   thunkForgotPassword
// } from '@/redux/slice/auth'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import useRequest from '@/hooks/useRequest'

import { useState } from 'react'
import OtpInput from 'react-otp-input'

function VerifyEmail() {
  const [otp, setOtp] = useState('')

  // const dispatch = useAppDispatch()

  // const navigator = useNavigate()

  // const { request, isLoading } = useRequest<TForgotPasswordResquest>()

  // useEffect(() => {
  //   if (request?.forgotPassword?.success) {
  //     const sentEmail = request?.forgotPassword?.responseData?.email

  //     navigator(
  //       `/confirmation/auth/sent-mail?email=${sentEmail}&status=sucess`,
  //       { replace: true }
  //     )
  //   }
  // }, [navigator, request])

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<TRequestVerifyOtpSchema>({
  //   resolver: zodResolver(requestVerifyOtpSchema)
  // })

  // const onSubmit = async (data: TRequestVerifyOtpSchema) => {
  // TODO: submit to server
  // ...

  // console.log(data)

  // dispatch(thunkForgotPassword(data))
  // }

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-end'> */}
      <form className='space-y-4 text-end'>
        {/* <input
          {...register('email')}
          placeholder='Email'
          className='p-3 rounded border-2 border-grey-500 w-full'
        />
        {errors.email && (
          <p className='text-left text-error-main'>{`${errors.email.message}`}</p>
        )} */}
        {/* {request?.forgotPassword?.error && (
          <p className='text-left text-error-main'>{`${request.forgotPassword.errorMessage}`}</p>
        )} */}

        <OtpInput
          value={otp}
          onChange={setOtp}
          inputType='tel'
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: '50px',
            height: '50px',
            border: '1px solid',
            borderRadius: '5px'
          }}
          containerStyle={{
            justifyContent: 'space-around'
          }}
        />
        <button
          // disabled={isLoading}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Send Request
        </button>
      </form>
    </>
  )
}

export default VerifyEmail
