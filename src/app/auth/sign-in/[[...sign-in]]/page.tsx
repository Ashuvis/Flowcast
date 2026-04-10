import React from 'react'
import { SignIn } from '@clerk/nextjs'

type Props = {}

const Signin = (props: Props) => {
  return (
    <SignIn
      routing="path"
      path="/auth/sign-in"
      signUpUrl="/auth/sign-up"
    />
  )
}

export default Signin