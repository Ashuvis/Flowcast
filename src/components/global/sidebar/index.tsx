import React from 'react'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({ activeWorkspaceId }: Props) => {
    return (
        <div className='bg-[#111111] flex-none relative p-4 h-full w-64 flex flex-col gap-4 items-center overflow-hidden'>SIDEBAR</div>

    )
}

export default Sidebar