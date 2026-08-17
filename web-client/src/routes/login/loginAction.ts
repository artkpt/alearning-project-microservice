import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { authen } from "../../features/auth/api/authen";
import { useAuth } from "../../features/auth/stores/authStore";
import { logout } from "../../features/auth/api/logout";
import {mapToAuth} from "../../features/auth/utils/mapToAuth.ts";


export const loginAction = async({ request }:ActionFunctionArgs)=>{
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const payload = {username, password} as Record<string, string | number | any[]>
    
    try{
        const response = await authen(payload)
        useAuth.getState().login(mapToAuth(response))
        return redirect('/')
    } catch(e){
        return redirect('/login')
    }
    
}

export const logoutAction = async()=>{
    // const auth = useAuth.getState().auth
    // await logout(auth?.access_token)
    useAuth.getState().logout()
    return redirect("/notes")
}