import Link from 'next/link'
import React from 'react'

export default function Saidbar() {
  return (
   <div className="link-wraper">
     <div className='bg-[#182237] h-[100vh] text-white flex flex-col gap-4 p-4 w-full'>
      <div className='flex flex-col mt-20 gap-5'>
      <Link className='text-[30px] link' href='/dashboard'>Books</Link>
      <Link className='text-[30px] link' href='/dashboard/author'>Author</Link>
      <Link className='text-[30px] link' href='/dashboard/genre'>genre</Link>
      </div>
    </div>
   </div>
  )
}
