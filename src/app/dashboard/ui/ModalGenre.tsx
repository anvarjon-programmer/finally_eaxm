import React, { Children } from 'react'
import { addGenre, creadGenre } from '../../../../api/genre.service'
export default function ModalGenre({setOpen, close, value, setValue}:any) {
  console.log(value)
  const formAction=async(formData:FormData)=>{
    const name = formData.get('name')
    let  payload:FormDataEntryValue={
      name:name,
    }
    if(value){
   //cread
  let id = value?.id
  let data = {
    payload:payload,
    id:id
  }
  creadGenre(data)
 console.log(payload)
 }else{
  //add
  const add = await addGenre(payload)
}
window.location.reload()
    
  }
  const closeOpen=()=>{
    setOpen(false)
    setValue('')
  }
  return (
    <div className='w-[400px] p-4 bg-white shadow shadow-white rounded-lg'>
        <form id="form" action={formAction} >
             <input defaultValue={value?.name}  name='name' type="text" className='w-full outline-none border-gray-900  border-b-2  placeholder:text-black'  placeholder='Ganre name'/>
             </form>
             <div className='text-white flex justify-around mt-4'>
                <button type='button' className='px-4 py-2 bg-yellow-500'  onClick={close} >close</button>
                <button type='submit' className='px-4 py-2 bg-green-500'  form="form" >add</button>
                </div>
    </div>
  )
}
