import { fetchPost } from "../../../utils/fetchUtils";

// FIXME: no need to send body
//////////////////////
export async function logout(token: string|undefined){
    const res = await fetchPost(import.meta.env.VITE_LOGOUT_API, null, {token})
    if(!res.ok){ throw new Error(res.status.toString()) }

    const data = await res.json()
     
    return data
}