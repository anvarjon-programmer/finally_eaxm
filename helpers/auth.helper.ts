import Cookies  from 'js-cookie';
export const setCookie = (token:string)=>{
    Cookies.set('token', token)
}
export const getCookie=()=>{
   return Cookies.get('token')
}