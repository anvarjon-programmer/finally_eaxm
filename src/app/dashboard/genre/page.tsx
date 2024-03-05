'use client'
import React, { useEffect, useState } from 'react'
import { $api } from '../../../../api/interceptors'
import { deleteGenre, getGenre } from '../../../../api/genre.service'
import ModalGenre from '../ui/ModalGenre'
export default function Genre (){
  const [open, setOpen] = useState<boolean>(false);

    const [genre, setgenre] = useState<any>([])
    const fn= async ()=>{
        const get:any = await  getGenre()
        setgenre(get)
    }
    const [value, setValue]=useState('')
   useEffect(()=>{
    fn()
   },[])
   const handleDelete=async(id:any)=>{
    const data = await deleteGenre(id)
     window.location.reload()
 }
 const openModal=(item:any)=>{
  // e.preventDefault()
  setOpen(true)  
  setValue(item)
  
}
const addModal=()=>{
  setOpen(true)  
  setValue('')

}
const close=(e:any)=>{
if(e.target.id === 'container' ){
  setOpen(false)
}
}
  return (
    <div className='p-4 relative'>
        <div id='container' onClick={close} className={open === false ? ' hidden' : '  absolute top-0 h-[100vh] flex items-center justify-center  backdrop-blur w-[100%]'}>
        <ModalGenre setOpen={setOpen} close={close} value={value} setValue={setValue}></ModalGenre>
        </div>
        <button className='px-4 py-2 rounded-lg text-white bg-green-500' type='button' onClick={addModal}>add</button>
         <div className='bg-gray-900  flex flex-wrap gap-3 p-2'>
      {
        genre?.map((item:any)=>(<div className='' key={item.id}>  <div className='p-3 text-white font-semibold text-[20px]  shadow  shadow-white  w-[200px] text-center'>
        <h2>{item.name}</h2>
          <div className='flex justify-around'>
          <button type='button' className='px-3 py-1 rounded bg-green-500' onClick={()=>openModal(item)}>edit</button>
          <button type='button' className='px-3 py-1 rounded bg-red-500' onClick={()=>handleDelete(item.id)}>delete</button>
          </div>
      </div></div>))
      }
    </div>
    </div>
  )
}
