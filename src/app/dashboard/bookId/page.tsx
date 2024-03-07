'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getBookId } from '../../../../api/books.service'

export default function BookId() {
    const [value, setValue]=useState<any>()
    const query = useSearchParams()
    const id= query?.get('id')
    console.log(id)
    const fn3 =async()=>{
      const data:any = await getBookId(id)  
      setValue(data)
      console.log(data.janr)
    }
 
    useEffect(()=>{
        fn3()
    },[])
    console.log(value)
  return (
    <div className='text-white flex justify-center items-center h-[100vh]'>
    <div className='flex gap-4 mt-50px'>
    <img className='w-[300px]' src={value?.avatar} alt="" />
      <div className='flex flex-col justify-around'>
         <h1>Name: {value?.first_name}</h1>
         <h2> {value?.last_name}</h2>
         <h2>{value?.age}</h2>
         <h2>genre: {value?.role}</h2>
         <h2>name: {value?.username}</h2>
         <h2>{value?.password}</h2>
         <h2>{value?.description}</h2>
      </div>
    </div>
     </div>
  )
}
