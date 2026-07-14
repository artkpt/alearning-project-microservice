import { NoteList } from "../../../features/note/components/NoteList"
import { useLoaderData } from "react-router"
import { LinkButton } from "../../../components/BaseComponents/LinkButton"
import { mapToNote } from "../../../features/note/utils/sanitization"
import type { NoteResponse } from "@alearning/types"
import { useAuth } from "../../../features/auth/stores/authStore"


export function NoteListPage(){
    let {notes} = useLoaderData() 
    const {auth} = useAuth()
    notes = notes.map((note: NoteResponse)=> mapToNote(note))

    return (
        <>
            <div className="flex justify-end mb-6 mr-4 gap-2">
                {auth?.userId && <LinkButton to="/notes/create">New</LinkButton>}
            </div>
            <NoteList notes={notes}></NoteList>
            
        </>
    )
}