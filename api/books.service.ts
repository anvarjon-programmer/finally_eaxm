import { $api } from "./interceptors";
export const getBook = async()=>{
    try {
        const get =  await $api.get('/users?page%5Boffset%5D=0&page%5Blimit%5D=21&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=employee')
        console.log(get?.data.data)  
        return get?.data?.data
    } catch (error) {
       console.log(error) 
    }
}
export const getBookId = async(data:any)=>{
    try {
        const get =  await $api.get(`book/${data}`)
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const deleteBook = async (data:any)=>{
    try {
        const get =  await $api.delete(`/users/${data}`)
    } catch (error) {
       console.log(error) 
    }
}
export const addBook = async (data:string)=>{
    try {
        console.log(data, 'book')
        const get =  await $api.post(`/users`, data)
    } catch (error) {
       console.log(error) 
    }
}
export const creadBook = async (data:any)=>{
    try {
        console.log(data)
        const get =  await $api.patch(`/users/${data?._id}`, data?.payload)
    } catch (error) {
       console.log(error) 
    }
}