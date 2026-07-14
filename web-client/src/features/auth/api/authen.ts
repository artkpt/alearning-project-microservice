import { fetchPost } from "../../../utils/fetchUtils";


export async function authen(payload: Record<string, string | number | any[]>){
    const res = await fetchPost(import.meta.env.VITE_LOGIN_API, payload)
    if(!res.ok){ throw new Error(res.status.toString()) }

    const data = await res.json()
     
    return data
}