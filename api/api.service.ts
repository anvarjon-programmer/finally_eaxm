'use client'    
import { cookies } from "next/headers";
import { ISignIn, ISignInPayload, ISignUp, ISignUpPayload } from "../types/auth.types";
import { $apiAuth } from "./interceptors";

export const signUp = async(data:ISignUp):Promise<ISignUpPayload | undefined>=>{
    try {
        const response = await $apiAuth.post('/auth/signup', data)
        return response?.data
    } catch (error) {
        console.log(error)
    }
}
export const signIn = async(data:ISignIn)=>{
    try {
        const response = await $apiAuth.post('/users/login', data);
        console.log(response?.data)
        return response?.data

    } catch (error) {
        console.log(error)
    }
}