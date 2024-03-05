import { $api } from "./interceptors";
export const getAuthor = async()=>{
    try {
        const get =  await $api.get('author')
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const getAuthorId = async(data:any)=>{
    try {
        const get =  await $api.get(`author/${data}`)
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const deleteAuthor = async (data:any)=>{
    try {
        const get =  await $api.delete(`author/${data}`)
    } catch (error) {
       console.log(error) 
    }
}
export const addAuthor = async (data:string)=>{
    try {
        console.log(data)
        const get =  await $api.post(`author`, data)
    } catch (error) {
       console.log(error) 
    }
}
export const creadAuthor = async (data:any)=>{
    try {
        console.log(data)
        const get =  await $api.patch(`author/${data?.id}`, data?.payload)
    } catch (error) {
       console.log(error) 
    }
}