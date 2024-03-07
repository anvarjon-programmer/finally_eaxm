import React, { ChangeEvent, Children, useEffect, useState } from 'react'
import { addGenre, creadGenre, getGenre } from '../../../../api/genre.service'
// import { addAuthor, creadAuthor, getAuthor } from '../../../../api/author.service'
import { $api } from '../../../../api/interceptors'
import { addBook, creadBook } from '../../../../api/books.service'
import Image from 'next/image'
export default function ModalBook({setOpen, close, value, setValue}:any) {
  let [author, setAuthor]=useState([])
  // let [genre, setGenre]=useState([])
 const [imgLink, setImgLink]=useState('')
 const fn=async()=>{
   const genre:any = await  getGenre()
  //  const author:any = await  getAuthor()
  //  setGenre(genre)
   setAuthor(author)
 }
 useEffect(()=>{
  fn()

 },[])
 console.log(value)
 const closeModal=()=>{
  setOpen(false)
  setValue('')
 }
 const imageLink=async(e:ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault()
    const file : File | null =  e.target.files && e.target.files[0]
    const form = new FormData()
    form.append('file', file as Blob)
    const respons = await $api.post('/upload', form)
    console.log(respons?.data?.path)
    setImgLink(respons?.data?.path)
 }
 const formAction=async(formData:FormData)=>{
      const first_name = formData.get('first_name')
      const last_name = formData.get('last_name')
      const age = formData.get('age')
      const role = formData.get('role')
      const username = formData.get('username')
      const password = formData.get('password')
      const description = formData.get('desc')
      const  ageNum = age ? age : value?.age
      
      let payload:any = {
        avatar:imgLink ? imgLink : value?.avatar,
        first_name: first_name ? first_name : value?.first_name,
        age:Number(ageNum),
        last_name: last_name ? last_name : value?.last_name,
        role: role ? role  : value?.role,
        description: description ? description : value?.description,
        username:username ? username  : value.username,
        password:password ? password  : value.password
      }
     console.log(payload)
      if(value?.first_name){
        let data = {
          _id:value?._id,
          payload
        }
        const fn = await creadBook(data)
      }else{
        
        const fn = await addBook(payload)
      }
setValue('')
window.location.reload()
 }
  return (
    <div  className='w-[800px] p-4 bg-white text-black shadow shadow-white rounded-lg'>
      <Image src={`http://localhost:8080/${imgLink}`} alt='user avatar'width={200} height={200} />
        <form className='usersInput' id="form" action={formAction} >
              <div>
              <input defaultValue={value?.image} type="file" onChange={imageLink} />           
              <input defaultValue={value?.first_name} type="text"  placeholder='firs_name'  name='first_name' />            
              <input defaultValue={value?.last_name} type="text"  placeholder='last_name'  name='last_name' />            
              <input defaultValue={value?.age} type="number"  placeholder='age'  name='age'/>       
                </div>     
               <div>
               <select defaultValue={value?.role} name="role" id="">
                <option  hidden>Select role</option>
                <option value='employee'>employee</option>
                </select>            
              <input defaultValue={value?.username} type="text"  placeholder='username' name='username'  />            
              <input defaultValue={value?.password} type="password" name='password'  placeholder='password'    />            
              <input defaultValue={value?.description} type="text" name='desc' placeholder='description' />            
               </div>
             </form>
             <div className='text-white flex justify-around mt-4'>
                <button type='button' className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'  onClick={closeModal} >close</button>
                <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'   form="form" >add</button>
                </div>
    </div>
  )
}
