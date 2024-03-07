"use client";
import "./Search.css";

import { useState } from "react";

const Search = ({inputValue, setInputValue} : {inputValue: any, setInputValue: any}) => {
    
  return (
    <div className="search-box">
        <form>
            <input value={inputValue} onChange={(e: any) => setInputValue(e.target.value)} type="text" placeholder="Search"/>
            <button>Search</button>
        </form>
    </div>
  )
}

export default Search