import Link from 'next/link'
import React from 'react'

export default function page() {
  
  return (
    <div className=' p-4 bg-gray-900 h-[100vh]'>
      <Link className='bg-green-500 px-4 py-2 rounded-lg text-white'  href='/auth/signIn'>Sign Up</Link>
    </div>
  )
}
