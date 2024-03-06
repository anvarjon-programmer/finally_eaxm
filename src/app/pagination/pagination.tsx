"use client"
import React from 'react'
import styles from './pagination.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
export default function Pagination({count}:{count :number | undefined}) {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams ? searchParams : "");
  const page = Number(params.get("page")) || 1
  const ITEM_PER_PAGE = 2;
  const hasPrew = ITEM_PER_PAGE * (page -1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < Number(count);
  const handleChangePage = (type:string) =>{
    type === 'prev' ? params.set("page", (page - 1).toString()) :
    params.set("page",(page + 1).toString());
    replace(`${pathname}?${params}`)
  }
  return (
    <div className={styles.container}>
        <button className={styles.button} disabled={!hasPrew} onClick={()=>handleChangePage('prev')}>Previous</button>
        <button className={styles.button} disabled={!hasNext} onClick={()=>handleChangePage('next')}>Next</button>
    </div>
  )
}
