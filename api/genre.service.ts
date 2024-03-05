import { $api } from "./interceptors";
export const getGenre = async()=>{
    try {
        const get =  await $api.get('category/get/all')
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const deleteGenre = async (data:any)=>{
    try {
        const get =  await $api.delete(`category/delete/${data}`)
    } catch (error) {
       console.log(error) 
    }
}
export const addGenre = async (data:string)=>{
    try {
        console.log(data)
        const get =  await $api.post(`category/create`, data)
    } catch (error) {
       console.log(error) 
    }
}
export const creadGenre = async (data:any)=>{
    try {
        console.log(data)
        const get =  await $api.patch(`category/update/${data?.id}`, data?.payload)
    } catch (error) {
       console.log(error) 
    }
}