'use client'
import React, { useState,useEffect } from 'react'
import { deleteAuthor, getAuthor } from '../../../../api/author.service'
import Link from 'next/link'
import ModalAuthor from '../ui/ModalAuthor'
import Search from '@/app/utils/Search'
import { getCookie } from '../../../../helpers/auth.helper'

export default function Author() {
  const [author,setAuthor] = useState([])
  const [value,setValue] = useState('')
  const [open,setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [inputValue, setInputValue] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState("")

    const fn =async()=>{
     let data =await getAuthor()
     console.log(data)
     setAuthor(data?.data)
     
    }
    useEffect(()=>{
      fn()
    },[])
    useEffect(() => {
      const accessToken: any = getCookie()
      const a = JSON.parse(atob(accessToken?.split(".")[1]))
      setIsAdmin(a.user.role)
      // for(el in a){
      //   for(i in a[el]){
      //     console.log(a[el][i])	
      //     }
      // }

    }, [])

    // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         itemsPerPage;
  const currentItems = author?.filter((user: any) => inputValue ? user.title.toLowerCase() === inputValue.toLowerCase() : user).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);


    const handleDelete = async (id: any) => {
      const data = await deleteAuthor(id);
      window.location.reload();
      console.log(id);
    };
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
    <div className="container">
      <div className='text-white p-4 relative flex flex-col gap-4'>

<div>
<Search inputValue={inputValue} setInputValue={setInputValue} />
{
  isAdmin === "admin" && 
  <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={openmodal}>add Auther</button>
}
</div>
{
  isAdmin === "admin" && 
<div id='container' onClick={close} className={open === false ? ' hidden' : '  absolute top-0 h-[100vh] flex items-center justify-center  backdrop-blur w-[100%]'}>
  <ModalAuthor setOpen={setOpen} close={closeModal} value={value} setValue={setValue}/>
</div>
}

<div className='flex flex-wrap gap-8'>
{
  currentItems?.map((item)=>(
    <div key={item?._id}>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.content}</p>
            <div className='flex items-center gap-8'>
              <button type='button' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => openModal(item)}>Edit</button>
              <button type='button' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => handleDelete(item?._id)}>Delete</button>
            </div>
          <Link href={{ pathname: '/dashboard/bookId', query: { id: item?._id } }} className='inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Info</Link>
      </div>
      </div>
              ))
            }
          </div>
          <div className='flex justify-center mt-7'>
    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='px-4 py-2 bg-blue-500 rounded-md mr-2'>
      Previous
    </button>
    <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= author?.length} className='px-4 py-2 bg-blue-500 rounded-md'>
      Next
    </button>
  </div>
</div>
    </div>
  )
}
