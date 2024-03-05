'use client'
import React from "react";
import { signUp } from "../../../../api/api.service";
import { ISignUpPayload } from "../../../../types/auth.types";
import { redirect } from "next/navigation";
// import SignUp from './page';
interface FormData{
  full_name:FormDataEntryValue | null,
  username :FormDataEntryValue | null,
  password :FormDataEntryValue | null,
}
export default function SignUp() {
    const handleSubmit= async(formData:any )=>{
        
        let full_name = formData.get('full_name')
        let username  = formData.get('username')
        let password  = formData.get('password')
        const response:ISignUpPayload | undefined = await signUp({full_name,username, password})
        if(response?.tokens?.access_token){
          console.log(response)
          redirect('/auth/signin')
        }
        
    }
  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-900 text-white ">
   <div className="w-[400px] h-[420px]  p-3 shadow shadow-white rounded-lg flex flex-col bg-gray-800 justify-around">
    <h1 className="text-[30px] text-center ">Sign Up</h1>
   <form id="form"  action={handleSubmit} className="flex flex-col gap-3">
        <input className="px-3 py-2 w-full placeholder:text-white bg-gray-800 border-b outline-none" name='full_name' placeholder="Full Name" type="text" />
        <input className="px-3 py-2 w-full placeholder:text-white bg-gray-800 border-b outline-none" name='username' placeholder="User Name" type="text" />
        <input className="px-3 py-2 w-full placeholder:text-white bg-gray-800 border-b outline-none" name='password' placeholder="Password" type="password" />
      </form>
      <div className="flex justify-around">
      <button className="px-4 py-2 rounded-md bg-green-500" form="form">Sign Up</button>
      <button className="px-4 py-2 rounded-md bg-green-500">Sign Ip</button>
      </div>
   </div>
    </div>
  );
}
