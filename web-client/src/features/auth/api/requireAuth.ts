import { useAuth } from "../stores/authStore"


export const requireAuth = (allowRole?:string)=>{
    const auth = useAuth.getState().auth 
    
    if(!auth){ throw new Error('401')}

    if(allowRole && auth.role !== allowRole) {throw new Error('403') }
    
    return
}