import React from 'react'
import { Spinner } from './spinner'
import clsx from 'clsx'

type Props = {
    state:boolean
    classname?:string
    color?:string
    children?:React.ReactNode
}

const Loader = ({ state, classname, color, children }: Props) => {
   return state ? <div className={clsx(classname)}><Spinner/></div>:children
}
 
export default Loader