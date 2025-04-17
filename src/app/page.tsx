import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const page = () => {
  return (
    <div>

      <div className='p-25 flex flex-col justify-center items-center gap-10'>
        <h1 className='text-3xl font-extrabold'>Welcome to my website</h1>
        <div className="flex gap-3">
        <Link href='/about'><Button>Learn More</Button></Link>

        </div>

      </div>
    </div>
  )
}

export default page
