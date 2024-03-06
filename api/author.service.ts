import { $api } from "./interceptors";
export const getAuthor = async()=>{
    try {
        const get =  await $api.get('guides?page%5Boffset%5D=0&page%5Blimit%5D=20&sort%5Bby%5D=id&sort%5Border%5D=desc')
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const getAuthorId = async(data:any)=>{
    try {
        const get =  await $api.get(`/guides/${data}`)
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const deleteAuthor = async (data:any)=>{
    try {
        const get =  await $api.delete(`/guides/${data}`)
    } catch (error) {
       console.log(error) 
    }
}
export const addAuthor = async (data:string)=>{
    try {
        console.log(data, 'data')
        const get =  await $api.post(`/guides`, data)
    } catch (error) {
       console.log(error) 
    }
}
export const creadAuthor = async (data:any)=>{
    try {
        console.log(data)
        const get =  await $api.patch(`/guides/${data?.id}`, data?.payload)
    } catch (error) {
       console.log(error) 
    }
}