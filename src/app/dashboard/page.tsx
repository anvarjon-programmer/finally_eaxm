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
    // window.location.reload();
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
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='bg-gray-900 text-white flex p-4 relative'>
      <div>
        <Search inputValue={inputValue} setInputValue={setInputValue} />
        <button className='px-4 py-1 bg-green-500 rounded-lg' onClick={openModal}>
          Add Author
        </button>
        <div id='container' onClick={close} className={open === false ? 'hidden' : 'absolute top-0 h-[100vh] flex items-center justify-center backdrop-blur w-[100%]'}>
          <ModalBook setOpen={setOpen} close={close} value={value} setValue={setValue} />
        </div>
        <div className='flex gap-4 flex-wrap'>
          {currentItems?.filter((user: any) => inputValue ? user.first_name.toLowerCase() === inputValue.toLowerCase() : user).map((item) => (
            <div key={item?._id}>
              <img src={item?.avatar !== "undefined" ? `http://localhost:8080/${item.avatar}` : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"} className='w-[150px] h-[150px] rounded-[50%] bg-center' alt='Author Image' />
              <div>
                <h2>First name: {item.first_name}</h2>
                <div className='flex flex-col gap-2 mt-2'>
                  <div className='flex justify-around '>
                    <button type='button' className='px-3 py-1 rounded bg-green-500' onClick={() => openModal(item)}>
                      Edit
                    </button>
                    <button type='button' className='px-3 py-1 rounded bg-red-500' onClick={() => handleDelete(item?._id)}>
                      Delete
                    </button>
                  </div>
                  <Link href={{ pathname: '/dashboard/bookId', query: { id: item?._id } }} className='bg-blue-500 w-[100%] py-1 rounded-lg text-center'>
                    Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-4'>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='px-4 py-2 bg-blue-500 rounded-md mr-2'>
            Previous
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= books.length} className='px-4 py-2 bg-blue-500 rounded-md'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
