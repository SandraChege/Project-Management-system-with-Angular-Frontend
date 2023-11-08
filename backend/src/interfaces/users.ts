import { Request } from "express"

export interface User{
    name:string,
    email:string,
    userID:string,
    role:string
    
}

export interface LoginUser extends Request{
    email:string,
    pass:string
}