import { Link, useFetcher, useNavigate } from "react-router";
import { ActionIcon } from "../../../components/ActionIcon";
import { Button } from "../../../components/BaseComponents/Button";
import type { Note } from "../types/note.types";
import type { Items } from "../../../components/BaseComponents/OptionList";
import { useAuth } from "../../auth/stores/authStore";

interface NoteListProps {
    notes: Note[]; 
}

export function NoteList({notes}: NoteListProps){
    const fetcher = useFetcher()
    const navigate  = useNavigate()
    const {auth} = useAuth()

    return (
        notes.map((note)=> {
            const items:Items = [
                {
                    options: [
                        {label: "Edit", key:"edit", action: updateHadle },
                        {label: "Delete", key:"delete", action: deleteHandle}
                    ]
                }
            ]

            function deleteHandle(){
                fetcher.submit(null, {
                    action: `/api/notes/${note.id}/delete`,
                    method: "DELETE"
                })
            }
            function updateHadle(){
                navigate(`/notes/${note.id}/edit`)
            }

            return (
                <div key={note.id} className="m-4 p-4 border border-main-contrast rounded-sm gap-2.5 flex-col flex">
                    <div className="flex justify-between">
                        <h3 className="text-xl font-semibold text-blue-600">
                            <Link to={`/notes/${note.id}`}>{note.title}</Link>
                        </h3>
                        {auth?.userId === note.ownerId && <ActionIcon items={items} />}
                    </div>
                    
                    <p className="text-sm break-keep">{note.description}</p>

                    <div className="flex gap-1">
                        {note.topics.map((topic)=> (
                            
                                <Button
                                    key={topic.id}
                                    className="text-[0.75rem] bg-main-contrast border border-black h-auto"
                                >
                                    {topic.name}
                                </Button>
                            
                        ))}
                    </div>
                   
                    <p className="text-xs ">
                        Author: {note.owner.username} | Created On: {note.createdAt}
                    </p>
                </div>
                    
            )
        })
    )    
}