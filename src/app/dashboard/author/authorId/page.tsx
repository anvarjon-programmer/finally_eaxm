'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAuthorId } from '../../../../../api/author.service'

export default function page() {
    const [value, setValue]=useState<any>()
    const query = useSearchParams()
    const id= query?.get('id')
    console.log(id)
    const fn =async()=>{
      const data:any = await getAuthorId(id)  
      setValue(data)
    }
    useEffect(()=>{
        fn()
    },[])
    console.log(value)
  return (
    <div className='text-white flex justify-center items-center h-[100vh]'>
   <div className='flex gap-4 '>
   <img className='w-[300px]' src={value?.image} alt="" />
     <div className='flex flex-col justify-around'>
        <h1>Author name: {value?.full_name}</h1>
        <h2>Country: {value?.country}</h2>
        <h2>Brith data: {value?.brithdata}</h2>
     </div>
   </div>
    </div>
  )
}
