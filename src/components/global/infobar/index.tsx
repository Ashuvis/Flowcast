import VideoRecorderIcon from '@/components/Icons/video-recorder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UploadIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
  return (
    <header className='pl-20 md:pl-65 fixed p-4 w-full flex items-center justify-between gap-4 '>
      <div className='flex justify-center items-center border-2 gap-4 rounded-3xl px-4 w-full max-w-lg '>
        <Search size={25} className='text-[#707070]'/>
        <Input className='bg-transparent border-none placeholder-neutral-500!' placeholder='Search for people, projects, tags & folders'/>
      </div>
      <div className='flex items-center gap-4' >
        <Button className='bg-[#9d9d9d] flex items-center gap-2'>
          <UploadIcon size={15}/>{''}
          <span className='flex items-center gap-2'>
            Upload
          </span>
        </Button>
        <Button className='bg-[#9d9d9d] flex items-center gap-2'>
          <VideoRecorderIcon/>
          <span className='flex items-center gap-2'>Record</span>
        </Button>
      </div>
    </header>
  )
}   
export default InfoBar