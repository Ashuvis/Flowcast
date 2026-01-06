import { on } from 'events'
import React from 'react'
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { verifyAccessToWorkspace } from '@/actions/workspace'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { get } from 'http'
import { getWorkspaceFolders } from '@/actions/workspace'
import { getAllUserVideos } from '@/actions/workspace'
import { getWorkspaces } from '@/actions/workspace'
import { getNotifications } from '@/actions/user'
import Sidebar from '@/components/global/sidebar'
type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({ params : {workspaceId},children}: Props) => {
    const auth= await onAuthenticateUser()
    if(!auth.user?.workspace) redirect('/auth/sign-in')
    if(!auth.user.workspace.length) redirect('/auth/sign-in')
    const hasAccess = await verifyAccessToWorkspace( workspaceId)

    if (hasAccess.status !== 200) {
      redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }
    if(!hasAccess.data?.workspace) return null

    const query= new QueryClient()


    await query.prefetchQuery({
      queryKey: ['workspace-folders'],
      queryFn: ()=> getWorkspaceFolders(workspaceId)
    })

     await query.prefetchQuery({
      queryKey: ['user-videos'],
      queryFn: ()=> getAllUserVideos(workspaceId)
    })

     await query.prefetchQuery({
      queryKey: ['user-workspaces'],
      queryFn: ()=> getWorkspaces()
    })

     await query.prefetchQuery({
      queryKey: ['user-notifications'],
      queryFn: ()=> getNotifications()
    })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='flex h-screen w-screen'>
        <Sidebar activeWorkspaceId={workspaceId} />
      </div>
    </HydrationBoundary>
  )
}

export default Layout