import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateWorkspace from '@/components/global/create-workspace'
import React from 'react'

type Props = {
  params:{ workspaceId: string}
}

const page = ({params}: Props) => {
  return (
    <div>
      <Tabs defaultValue='Videos' className='mt-6'>
        <div className='flex w-full justify-center items-center'>
          <TabsList className='bg-transparent gap-2 pl-0'>
            <TabsTrigger className='p-3.25 px-6 rounded-full data-[state=active]:bg-[#252525]' value='Videos'> Videos </TabsTrigger>
            <TabsTrigger value='Archive' className='p-3.25 px-6 rounded-full data-[state=active]:bg-[#252525]'>Archive</TabsTrigger>
          </TabsList>
          <div className='flex gap-x-3'>
            <CreateWorkspace/>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default page