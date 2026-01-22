"use client"
import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getWorkspaces } from '@/actions/workspace'
import { Separator } from '@/components/ui/separator copy'
import { useQueryData } from '@/hooks/usequery'
import { workspaceProps } from '@/types/index.type'
import Modal from '@/components/global/Modal'
import { PlusCircle } from 'lucide-react'

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces)

  const { data: workspace } = data as workspaceProps

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  }

  const { data: workspacesResp, isLoading } = useQuery({
    queryKey: ['user-workspaces'],
    queryFn: getWorkspaces,
  })

  console.log(activeWorkspaceId);
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
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) =>
            (<SelectItem key={workspace.id} value={workspace.id}>{workspace.name}
            </SelectItem>))}
            {workspace.members.length > 0 && workspace.members.map((workspace) => workspace.workspace && <SelectItem value={workspace.workspace.id} key={workspace.workspace.id}>{workspace.workspace.name}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Modal trigger={<span className="text-white text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-1.25 gap-2 "> <PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" />Invite</span>} title='Invite in Workspace' description='Invite other user to your workspace'>
              WorkspaceSearch
      </Modal>
    </div>
  )
}
export default Sidebar