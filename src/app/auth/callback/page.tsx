import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  //authentication
    const authenticateUser = await onAuthenticateUser()
    if (authenticateUser.status === 200 || authenticateUser.status === 201) {
      const workspaceId = authenticateUser.user?.workspace?.[0]?.id
      if (workspaceId) {
        return redirect(`/dashboard/${workspaceId}`)
      }
    }
    if (authenticateUser.status === 400 || authenticateUser.status === 403 || authenticateUser.status === 500) {
      return redirect('/auth/signin')
    }
  return (
    <div>
        {/* authentication dashboard */}
        
    </div>
  )
}

export default page