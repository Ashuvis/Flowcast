import { on } from 'events'
import React from 'react'
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { verifyAccessToWorkspace } from '@/actions/workspace'

type Props = {
    params: Promise<{ workspaceId: string }>
}

const Page = async ({ params }: Props) => {
    const { workspaceId } = await params;
    const auth= await onAuthenticateUser()
    if(!auth.user?.workspace) redirect('/auth/sign-in')
    if(!auth.user.workspace.length) redirect('/auth/sign-in')
      const hasAccess = await verifyAccessToWorkspace( workspaceId)


  return (
    <div>page</div>
  )
}

export default Page