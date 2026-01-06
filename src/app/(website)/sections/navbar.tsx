import React from 'react'
import { Menu,User} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center px-5'>
      <div className='text-2xl font-semibold flex items-center gap-x-3'>
        <Menu className='w-6 h-6'/>
        <img src="/Flowcast.svg" alt="logo" width={30} height={30} />
        Flowcast
      </div>
      <div className='hidden gap-x-10 items-center lg:flex'>
        <Link href="/" className='bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/90'>Home</Link>
        <Link href="/pricing" className=''>Pricing</Link>
        <Link href="/contact" className=''>Contact</Link>
      </div>
        <Link href="/auth/sign-in" className=''>
        <Button className='text-base flex gap-x-2 bg-amber-50 text-black hover:bg-amber-50/90'>
          <User className='w-4 h-4' fill='#000000'/>
          Login</Button>
        </Link>
      </div>
  )
}

export default Navbar