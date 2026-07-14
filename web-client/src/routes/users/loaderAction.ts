import { redirect, type ActionFunctionArgs } from "react-router"
import { requireAuth } from "../../features/auth/api/requireAuth"
import { createUser } from "../../features/user/createUser"

export const createUserAction = async ({ request }: ActionFunctionArgs) => {
    try{
        const formData = await request.formData()
        // FIXME: assertsion
        const payload = Object.fromEntries(formData) as Record<string, string>;
        await createUser(payload) 
        return redirect("/notes")
    }catch(e){
        if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
        if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
        if(e instanceof Error && e.message === "422"){
            return e.cause
        }
    }
}

export const createUserLoader = ()=>{
    try{
        requireAuth("admin")
    }catch(e){
        if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
        if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
    }
}