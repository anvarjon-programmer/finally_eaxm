import Link from 'next/link'
import React from 'react'

export default function Saidbar() {
  return (
    <div className='bg-gray-900  h-[100vh] text-white flex flex-col gap-4 p-4'>
      <Link className='text-[30px]' href='/dashboard'>Books</Link>
      <Link className='text-[30px]' href='/dashboard/author'>Author</Link>
      <Link className='text-[30px]' href='/dashboard/genre'>genre</Link>
    </div>
  )
}
