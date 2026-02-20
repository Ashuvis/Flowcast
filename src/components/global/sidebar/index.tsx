"use client"
import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getWorkspaces } from '@/actions/workspace'
import { Separator } from '@/components/ui/separator copy'
import { useQueryData } from '@/hooks/usequery'
import { NotificationProps, workspaceProps } from '@/types/index.type'
import Modal from '@/components/global/Modal'
import { Menu, PlusCircle } from 'lucide-react'
import Search from '@/components/global/search-users'
import { MENU_ITEMS } from '@/constants'
import SidebarItem from './sidebar-item'
import { getNotifications } from '@/actions/user'
import WorkspacePlaceholder from './workspaceplaceholder'
import GlobalCard from '../global-card'
import { Button, } from '@/components/ui/button'
import Loader from '../loader'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type Props = {
  activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName= usePathname();

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspaces)
  const menuItems = MENU_ITEMS(activeWorkspaceId)

  const {data: notifications} = useQueryData(["user-notifications"],getNotifications)

  const { data: workspace } = data as workspaceProps
  const {data: count} = notifications as NotificationProps

  const plan = workspace.subscription?.plan?.toLowerCase()
  const isFreePlan = !plan || plan === 'free'

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  }
  const currentWorkspace = workspace.workspace.find((ws) => ws.id === activeWorkspaceId)
  const { data: workspacesResp, isLoading } = useQuery({
    queryKey: ['user-workspaces'],
    queryFn: getWorkspaces,
  })

  const SidebarSection =(
    <div className='bg-[#111111] flex-none relative p-4 h-full w-62.5 flex flex-col gap-4 items-center overflow-y-auto min-h-0'>
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
      {currentWorkspace?.type === 'public' && workspace.subscription?.plan == 'pro' && (<Modal trigger={
        <span className="text-white text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-1.25 gap-2 ">
          <PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" />
          Invite
        </span>}
        title='Invite in Workspace'
        description='Invite other user to your workspace'>
        WorkspaceSearch
        <Search workspaceId={activeWorkspaceId} />
      </Modal>)}

      <p className='w-full text-[#9D9D9D]'>Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (<SidebarItem href={item.href} icon={item.icon} title={item.title} selected={pathName===item.href} key={item.title} notifications={(item.title ==="Notifications" && count._count && count._count.notification) || 0} />))}
        </ul>
      </nav>
      <Separator className='w-4/5'/>
      <p className='w-full text-[#9D9D9D] font-bold mt-4' > Workspaces</p>
        {workspace.workspace.length === 1 && workspace.members.length === 0 && ( 
            <div className='w-full -mt-2.5'>
              <p className='text-[#9d9d9d] font-medium text-sm '>
                {workspace.subscription?.plan === 'free' ? 'upgrade to join workspaces' : 'Create or join more workspaces to collaborate.'}
              </p>
            </div>
            )}
      <nav className='w-full'>
        <ul className='h-35 overflow-auto overflow-x-hidden fade-layer'>
          {workspace.workspace.length > 0 && workspace.workspace.map((item) => item.type !=='personal' && (<SidebarItem href={`/dashboard/${item.id}`} title={item.name} selected={pathName===`/dashboard/${item.id}`} key={item.name} icon={<WorkspacePlaceholder>{item.name.charAt(0)}</WorkspacePlaceholder>} notifications={0} />))}
          {
            workspace.members.length > 0 && workspace.members.map((item) =>(<SidebarItem href={`/dashboard/${item.workspace.id}`} title={item.workspace.name} selected={pathName===`/dashboard/${item.workspace.id}`} key={item.workspace.name} icon={<WorkspacePlaceholder>{item.workspace.name.charAt(0)}</WorkspacePlaceholder>} notifications={0} />))
          }
        </ul>
      </nav>
      <Separator className='w-4/5'/>
      {isFreePlan && (
        <div className='-mt-4 w-full'>
          <GlobalCard title='Upgrade To Pro' description='Unlock AI features like transcription, AI summary, and many more...'>
            <Button className='text-sm w-full bg-[#9d9d9d] hover:bg-[#9d9d9d]/70'>
              <Loader state={false}>Upgrade</Loader>
            </Button>
          </GlobalCard>
        </div>
      )}
    </div>
  )
  return <div className='full'>
    </InfoBar>
    {/* {Sheet mobile and desktop} */}
    <div className='md:hidden fixed my-4 '>
      <Sheet>
        <SheetTrigger asChild className='ml-2'>
          <Button variant={"ghost"} className='mt-0.5 '>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className='p-0 w-fit h-full'>
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar navigation</SheetTitle>
          </SheetHeader>
          {SidebarSection}
        </SheetContent>
      </Sheet>
    </div>
    <div className='md:block hidden h-full '>
      {SidebarSection}
    </div>
  </div>
};
export default Sidebar;