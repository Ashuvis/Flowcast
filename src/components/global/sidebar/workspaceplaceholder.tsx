import React from 'react'

type Props = {children: React.ReactNode}

const WorkspacePlaceholder = ({children}: Props) => {
  return (
    <span className='bg-[#545454]  flex items-center justify-center font-bold w-8 px-2 h-7 rounded-sm text-[#1d1d1d]'>
      {children}
    </span>
  )
}

export default WorkspacePlaceholder