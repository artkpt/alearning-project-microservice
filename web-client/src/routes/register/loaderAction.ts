import { registerUser } from "@/features/user/registerUser";
import { redirect, type ActionFunctionArgs } from "react-router";


export const registerAction = async ({ request }: ActionFunctionArgs) => {
    try{
        const formData = await request.formData()
        // FIXME: assertsion
        const payload = Object.fromEntries(formData) as Record<string, string>;
        await registerUser(payload) 
        return redirect("/notes")
    }catch(e){
        if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
        if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
        if(e instanceof Error && e.message === "422"){
            return e.cause
        }
    }
}