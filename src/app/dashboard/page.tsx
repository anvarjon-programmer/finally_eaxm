'use client'
import React,{ useEffect, useState } from 'react'
import { deleteBook, getBook } from '../../../api/books.service'
import ModalBook from './ui/ModalBook'
import Link from 'next/link'
import { getGenre } from '../../../api/genre.service'
import { getAuthor } from '../../../api/author.service'

export default function page() {
  const [books, setBooks]=useState([])
  const [open, setOpen]=useState(false)
  const [value, setValue]=useState('')
 

  const fn=async()=>{
   const data:any = await  getBook()
  
   
   setBooks(data)
  }

  useEffect(()=>{
    fn()
  },[])
  const handleDelete=async(id:any)=>{
    const data = await deleteBook(id)
     window.location.reload()
    console.log(id)
 }
 const openModal=(item)=>{
  console.log(item)
  setValue(item)
  setOpen(true)
 }
 const close=(e:any)=>{
  if(e.target.id === 'container' ){
    setOpen(false)
    setValue('')
  }
  }
  return (
    <div className='bg-gray-900 text-white flex p-4 relative'>
    <div>
    <button className='px-4 py-1 bg-green-500  rounded-lg' onClick={openModal}>add Auther</button>
      <div id='container' onClick={close} className={open === false ? ' hidden' : '  absolute top-0 h-[100vh] flex items-center justify-center  backdrop-blur w-[100%]'}>
        <ModalBook setOpen={setOpen} close={close} value={value} setValue={setValue}/>
        </div>
     <div className='flex gap-4 flex-wrap'>
     {
        books?.map((item)=>(
          <div key={item?._id}>
             <img src={`http://localhost:8080/${item?.avatar}`} className=' w-[150px] h-[150px] rounded-[50%] bg-center' alt="Author Image" />
             <div>
             <h2>First name: {item.first_name}</h2>
             <div className='flex flex-col gap-2 mt-2'>
             <Link href={{pathname:'/dashboard/bookId', query:{id:item?._id}}} className='bg-blue-500  w-[100%] py-1 rounded-lg text-center'>Info</Link>
          <div className='flex justify-around  '>
          <button type='button' className='px-3 py-1 rounded bg-green-500' onClick={()=>openModal(item)}>edit</button>
          <button type='button' className='px-3 py-1 rounded bg-red-500' onClick={()=>handleDelete(item?._id)}>delete</button>
          </div>
             </div>
             </div>
          </div>
        ))
      }
     </div>
    </div>
    </div>
  )
}
