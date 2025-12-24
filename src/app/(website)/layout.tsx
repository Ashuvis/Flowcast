import React from 'react'
import Navbar from './sections/navbar'
type Props = {
  children: React.ReactNode
}
const layout = ({ children }: Props) => {
  return (
    <div className=" flex flex-col py-5 px-10 xl:px-0 container">
        <Navbar />
      {children}
    </div>
  )
}

export default layout
