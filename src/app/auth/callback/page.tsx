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
    return redirect('/dashboard')
  }

  if (authenticateUser.status === 403) {
    return redirect('/auth/sign-in')
  }

  if (authenticateUser.status === 500) {
    return (
      <div className="max-w-lg rounded-md border border-zinc-700 bg-zinc-900 p-6 text-zinc-100">
        <h1 className="mb-2 text-lg font-semibold">Sign-in could not be completed</h1>
        <p className="text-sm text-zinc-300">Your account is authenticated, but we could not finish loading your workspace profile.</p>
        <p className="mt-3 text-xs text-zinc-400">Please try again in a moment. If this persists, check database connectivity and Prisma schema setup.</p>
      </div>
    )
  }

  if (authenticateUser.status === 400) {
    return redirect('/auth/sign-up')
  }

  return (
    <div>
        {/* authentication dashboard */}
        
    </div>
  )
}

export default page