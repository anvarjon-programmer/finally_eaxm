'use client'
import React, { useState,useEffect } from 'react'
import { deleteAuthor, getAuthor } from '../../../../api/author.service'
import Link from 'next/link'
import ModalAuthor from '../ui/ModalAuthor'

export default function Author() {
  const [author,setAuthor] = useState([])
  const [value,setValue] = useState('')
  const [open,setOpen] = useState(false)
    const fn =async()=>{
     let data =await getAuthor()
     setAuthor(data)

    }
    useEffect(()=>{
      fn()
    },[])
    // const deleteAuth=async()=>{
    // // const data = await  deleteAuthor(id)
    // // const data = await deleteGenre(id)       
    // }
    const openmodal=()=>{
      setOpen(true)
      // setValue(item)
    }
    const closeModal =()=>{
      setOpen(false)
    }
    const close=(e:any)=>{
      if(e.target.id === 'container' ){
        setOpen(false)
      }
      }
  return (
    <div className='text-white p-4 relative flex flex-col gap-4'>
      <div>
      <button className='px-4 py-1 bg-green-500  rounded-lg' onClick={openmodal}>add Auther</button>
      </div>
      <div id='container' onClick={close} className={open === false ? ' hidden' : '  absolute top-0 h-[100vh] flex items-center justify-center  backdrop-blur w-[100%]'}>
      <ModalAuthor setOpen={setOpen} close={closeModal} value={value} setValue={setValue}/>
        </div>
     <div className='flex gap-4'>
     {/* {
        author?.map((item)=>(
          <div key={item?.id} className=''>
            <img src={item?.image} className=' w-[150px] h-[150px] rounded-[50%] bg-center' alt="Author Image" />
            <div className='flex flex-col gap-2'>
              <p>Author name: {item?.full_name}</p>
              <p>Country: {item?.country}</p>
              <Link href={{pathname:'/dashboard/author/authorId', query:{id:item?.id}}} className='bg-blue-500 w-[100%] rounded-lg text-center'>Info</Link>
              <div className='flex justify-around'>
                <button onClick={()=>openmodal(item)} className=' bg-green-500 px-4 py-1 rounded-lg '>creat</button>
                <button onClick={()=>deleteAuth(item?.id)} className=' bg-red-500 px-4 py-1 rounded-lg '>delete</button>
                </div>
            </div>
          </div>
        ))
      } */}
     </div>
    </div>
  )
}
