import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
    icon:React.ReactNode,
    title:string,
    href:string,
    selected:boolean,
    notifications?:number
}

const SidebarItem = ({href, icon, title, selected, notifications}: Props) => {
  return (
    <li className='cursor-pointer my-1.25'>
        <Link className={cn('flex flex-items justify-between group rounded-lg hover:bg-[#1d1d1d]', selected ? 'bg-[#1d1d1d]' : '')} href={href}>
            <div className='flex items-center gap-2 transition-all cursor-pointer p-1.25'>
                {icon}
                <span className={cn('font-medium group-hover:text-[#9d9d9d] transition-all truncate w-32', selected ? 'text-white' : 'text-[#545454]')}>
                    {title}
                </span>
            </div>
            
        </Link>
    </li>
  )
}

export default SidebarItem