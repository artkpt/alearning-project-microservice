import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { fetchDel, fetchPut } from "../../utils/fetchUtils";
import { redirect } from "react-router";
import { getNotes } from "../../features/note/api/getNotes";
import { createNote } from "../../features/note/api/createNote";
import { getNoteById } from "../../features/note/api/getNote";
import { useAuth } from "../../features/auth/stores/authStore";
import { requireAuth } from "../../features/auth/api/requireAuth";

//FIXME
/////////////////////
// DELETE/PUT /notes/:id
export const noteAction = async({request,params}:ActionFunctionArgs)=>{
    const token = useAuth.getState().auth?.accessTokens
    if(request.method === 'DELETE' ){
        const noteId = params.id
        try{
            await fetchDel(`${import.meta.env.VITE_NOTE_API}/${noteId}`,{token})
            return redirect('/notes')
        }catch(e){
            if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
            if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
        }
    }
    if(request.method === 'PUT' ){
        const noteId = params.id
        const payload = await request.json()
        try{
            await fetchPut(`${import.meta.env.VITE_NOTE_API}/${noteId}`, payload, {token})
            return redirect(`/notes/${noteId}`)
        }catch(e){
            if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
            if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
        }
    }          
}

//FIX ME
/////////////////////////
// DELETE /api/notes/:id/delete
export const deleteNoteFetcher = async({params}:ActionFunctionArgs)=>{
    const token = useAuth.getState().auth?.accessTokens
    const noteId = params.id
    try{
        await fetchDel(`${import.meta.env.VITE_NOTE_API}/${noteId}`,{token})
    }catch(e){
        if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
        if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
    }

}


// POST /notes
export const createNoteAction = async ({ request }: ActionFunctionArgs) => {
    try{
        const payload = await request.json()
        await createNote(payload)
        return redirect("/notes")
    }catch(e){
        if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
        if(e instanceof Error && e.message === "403"){ throw redirect('/notes')}
    }
}

// GET /notes
export const getNotesLoader = async() => { 
    return {
        notes: await getNotes()
    }
}

export const getNoteByIdLoader = async({params}: LoaderFunctionArgs) => {
    const id = params.id as string
    try{
        const note = await getNoteById(id)
        
        return { note: note }

    }catch(e){
        if(e instanceof Error && e.message === "403" ){ throw redirect('/notes')}
    }
}

export const editNoteLoader = async({params}: LoaderFunctionArgs) => {
    const id = params.id as string
    try{
        requireAuth()
        const note = await getNoteById(id)
        
        return { note: note }

    }catch(e){
        if(e instanceof Error && e.message === "403" ){ throw redirect('/notes')}
        if(e instanceof Error && e.message === "401" ){ throw redirect('/login')}
    }
}