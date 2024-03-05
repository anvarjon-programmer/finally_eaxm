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
      const full_name = formData.get('full_name')
      const country = formData.get('country')
      const birthdate = formData.get('date')
      
      let payload = {
        image: imgLink ? imgLink : value?.image,
        full_name : full_name ? full_name  : value?.full_name ,
        country: country ? country : value?.country,
        birthdate: birthdate ? birthdate : value?.birthdate,
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
        <form id="form" action={formAction} >
              <input defaultValue={value?.image} type="file" onChange={imageLink} />
             <input defaultValue={value?.full_name}  name='full_name' type="text" className='w-full outline-none border-gray-900 text-black  border-b-2  placeholder:text-black'  placeholder='Full name'/>
             <input defaultValue={value?.birthdate} type='date' name='date' />
             <input defaultValue={value?.country}  placeholder='mm/dd/yy' className='border' name='country' type="text" className='w-full outline-none border-gray-900  border-b-2  placeholder:text-black'  placeholder='Country'/>
             </form>
             <div className='text-white flex justify-around mt-4'>
                <button type='button' className='px-4 py-2 bg-yellow-500'  onClick={closeModal} >close</button>
                <button type='submit' className='px-4 py-2 bg-green-500'   form="form" >add</button>
                </div>
    </div>
  )
}
