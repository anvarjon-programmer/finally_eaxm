export interface ISignUp {
    id?:string,
    full_name:string | null
    username:string
    password:string
}
interface data{token:string, role:string}
export interface ISignIn {
    id?:string,
    username:string
    password:string
}
export interface ISignUpPayload{
    message:string,
    admin:ISignUp,
    token:string
} 
export interface ISignInPayload{
    message:string,
    admin:ISignIn,
    data:data
} 