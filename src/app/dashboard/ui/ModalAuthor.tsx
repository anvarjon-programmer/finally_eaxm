import React, { Children, useState } from 'react'
import { addGenre, creadGenre } from '../../../../api/genre.service'
import { addAuthor, creadAuthor } from '../../../../api/author.service'
import { $api } from '../../../../api/interceptors'
export default function ModalAuthor({setOpen, close, value, setValue}:any) {
 const [imgLink, setImgLink]=useState('')
 const closeModal=()=>{
  setOpen(false)
  setValue('')
 }
 const imageLink=async(e:any)=>{
  e.preventDefault()
    const file =   e.target.files[0]
    const form = new FormData()
    form.append('file', file as Blob)
    const respons = await $api.post('files/upload', form)
    console.log(respons)
    setImgLink(respons?.data)
 }
 const formAction=async(formData:FormData)=>{
      const title = formData.get('title')
      const content = formData.get('content')
      
      let payload = {
        title : title? title  : value?.title,
        content: content ? content : value?.content,
      }
      if(value?.full_name){
        let data = {
          payload, 
          id: value?.id
        }
        creadAuthor(data)
console.log(payload)
      }else{
        addAuthor(payload)
      }
setValue('')
 }
  return (
    <div  className='w-[400px] p-4 bg-white text-black shadow shadow-white rounded-lg'>
        <form className='authorModal-form' id="form" action={formAction} >
             <input defaultValue={value?.title} type='text' name='title' placeholder='title..'/>
             {/* <input defaultValue={value?.content} type='text' name='content' placeholder='content..'/> */}
             <textarea defaultValue={value?.content} name='content' id="" cols={10} rows={5}></textarea>
             </form>
             <div className='text-white flex justify-around mt-4'>
                <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'  onClick={closeModal} >close</button>
                <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'   form="form" >add</button>
                </div>
    </div>
  )
}
