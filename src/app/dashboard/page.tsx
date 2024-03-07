'use client'
import React, { useEffect, useState } from 'react';
import { deleteBook, getBook } from '../../../api/books.service';
import ModalBook from './ui/ModalBook';
import Link from 'next/link';
import { getGenre } from '../../../api/genre.service';
import { getAuthor } from '../../../api/author.service';
import Search from '../utils/Search';

export default function page() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fn = async () => {
    const data: any = await getBook();
    setBooks(data);
  };

  useEffect(() => {
    fn();
  }, []);

  const handleDelete = async (id: any) => {
    const data = await deleteBook(id);
    window.location.reload();
    console.log(id);
  };

  const openModal = (item) => {
    console.log(item);
    setValue(item);
    setOpen(true);
  };

  const close = (e: any) => {
    if (e.target.id === 'container') {
      setOpen(false);
      setValue('');
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <Search inputValue={inputValue} setInputValue={setInputValue} />
      <div className='bg-gray-900 text-white flex p-4 relative'>
      <div>
        <button className='px-4 py-1 bg-green-500 rounded-lg mb-7' onClick={openModal}>
          Add User
        </button>
        <div id='container' onClick={close} className={open === false ? 'hidden' : 'absolute top-0 h-[100vh] flex items-center justify-center backdrop-blur w-[100%]'}>
          <ModalBook setOpen={setOpen} close={close} value={value} setValue={setValue} />
        </div>
        <div className='flex gap-4 flex-wrap'>
          {currentItems?.filter((user: any) => inputValue ? user.first_name.toLowerCase() === inputValue.toLowerCase() : user).map((item) => (
            <div key={item?._id}>
              
                <div className=" w-[350px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='h-[200px]'>
                      <img src={item?.avatar !== "undefined" ? `http://localhost:8080/${item.avatar}` : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"} className='w-full h-full rounded-[10px] bg-center' alt='Author Image' /> 
                    </div>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.first_name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
                         
                        <div className='flex justify-around mb-4'>
                    <button type='button' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => openModal(item)}>
                      Edit
                    </button>
                    <button type='button' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => handleDelete(item?._id)}>
                      Delete
                    </button>
                  </div>
                  <Link href={{ pathname: '/dashboard/bookId', query: { id: item?._id } }} className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-[16px] px-10 py-2.5 me-2 mb-2 p-7 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-auto'>
                    Info
                  </Link>
                    </div>
                </div>

            </div>
          ))}
        </div>
        <div className='flex justify-center mt-7'>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='px-4 py-2 bg-blue-500 rounded-md mr-2'>
            Previous
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= books.length} className='px-4 py-2 bg-blue-500 rounded-md'>
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
