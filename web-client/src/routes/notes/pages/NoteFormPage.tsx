import { useLoaderData } from "react-router"
import { NoteForm } from "../../../features/note/components/NoteForm"
import { mapToNote } from "../../../features/note/utils/sanitization"


export function NoteFormPage(){
    const data = useLoaderData()
    let note = data?.note 

    if(note){
       note = mapToNote(note)
    }

    return <NoteForm note={note} />
}