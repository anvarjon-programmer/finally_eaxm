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
    <div className='flex gap-4 '>
    <img className='w-[300px]' src={value?.image} alt="" />
      <div className='flex flex-col justify-around'>
         <h1>Name: {value?.name}</h1>
         <h2>Price: {value?.price}</h2>
         <h2>Code: {value?.code}</h2>
         <h2>genre: {value?.janr?.name}</h2>
         <h2>Author: {value?.author?.full_name}</h2>
      </div>
    </div>
     </div>
  )
}
