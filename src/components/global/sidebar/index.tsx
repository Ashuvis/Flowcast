"use client"
import React from 'react'
import { Select,SelectTrigger,SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel} from '@/components/ui/select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getWorkspaces } from '@/actions/workspace'
import { Separator } from '@/components/ui/separator copy'
import { useQueryData } from '@/hooks/usequery'
import { workspaceProps } from '@/types/index.type'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

  const {data,isFetched} = useQueryData(["user-workspaces"],getWorkspaces)

const {data:workspace}=data as workspaceProps

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  }

  const { data: workspacesResp, isLoading } = useQuery({
    queryKey: ['user-workspaces'],
    queryFn: getWorkspaces,
  })

  const workspaces = React.useMemo(() => {
    const payload = workspacesResp?.data
    if (!payload) return [] as { id: string; name: string }[]
    const own = payload.workspace ?? []
    const memberWs = payload.members?.map((m: any) => m.WorkSpace) ?? []
    return [...own, ...memberWs]
  }, [workspacesResp])


  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-62.5 flex flex-col gap-4 items-center overflow-hidden'>
      <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
        <Image src="/Flowcast.svg" alt="Logo" width={32} height={32} />
        <p className='text-2xl font-bold text-white'>Flowcast</p>
      </div>

      <Select value={activeWorkspaceId || undefined} onValueChange={onChangeActiveWorkspace}>
        <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>

        <SelectContent className='bg-[#111111] backdrop-blur-xl'>
          {isLoading ? (
            <SelectItem value="" disabled>Loading...</SelectItem>
          ) : workspaces.length > 0 ? (
            workspaces.map((w: any) => (
              <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>No workspaces</SelectItem>
          )}
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (<SelectItem key={workspace.id} value={workspace.id}>{workspace.name}</SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Sidebar