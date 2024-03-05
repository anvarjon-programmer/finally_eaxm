import axios from "axios";
import { config } from "process";
import { getCookie } from "../helpers/auth.helper";
const API_URL = 'http://localhost:8080'
const $api = axios.create({
    baseURL:API_URL
})
const $apiAuth = axios.create({
    baseURL:API_URL
})

$api.interceptors.request.use((config)=>{
    const accessToken = getCookie()
    if(config.headers && accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

export {$api, $apiAuth}