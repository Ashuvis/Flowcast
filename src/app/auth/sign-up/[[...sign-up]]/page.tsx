import React from 'react'
import { SignUp } from '@clerk/nextjs'

type Props = {}

const Signup = (props: Props) => {
  return (
    <SignUp
      routing="path"
      path="/auth/sign-up"
      signInUrl="/auth/sign-in"
    />
  )
}

export default Signup