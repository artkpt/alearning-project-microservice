import AsyncCreatableSelect from "react-select/async-creatable"
import { Input } from "../../../components/BaseComponents/Input"
import { useState, type SyntheticEvent } from "react"
import type { MultiValue } from "react-select"
import { Button } from "../../../components/BaseComponents/Button"
import { Form, useSubmit} from "react-router";
import type { Note } from "../types/note.types"
import { createTopic } from "../../topic/api/createTopic"
import { getTopicByName } from "../../topic/api/getTopic"
import { useAuth } from "../../auth/stores/authStore"


interface TopicOption {
  label: string;
  value: string;
  __isNew__?: boolean;
}

interface NoteFormProps{
    note?: Note
}

export function NoteForm({note}: NoteFormProps){
    const submit = useSubmit()
    let topics = [] as MultiValue<TopicOption>
    const {auth} = useAuth()

    if(note){
        topics = note.topics.map((topic: any) => (
                {
                    value: topic.id,
                    label: topic.name
                }
        ))
    } 
    
    const [inputTitle, setInputTitle] = useState(note? note.title : "")
    const [inputDesc, setInputDesc] = useState(note? note.description : "")
    const [inputContent, setInputContent] = useState(note? note.content : "")
    const [inputVis, setInputVis] = useState(note? note.visibility : "public")
    const [selectOptions, setSelectOptions] = useState<MultiValue<TopicOption>>(note? topics: [])

    
    
    async function loadOptions(searchValue:string) {
        const params:{search?: string} = {}
        params.search = searchValue
        try{
            const data = await getTopicByName(params)
            const options = data.map((topic: any) => (
                {
                    value: topic.id,
                    label: topic.name
                }
            ))
            return options
        } catch{ return []}
    }

    async function handleTopic(e: SyntheticEvent){
        e.preventDefault()
        const newOptions = selectOptions.filter((option)=> option["__isNew__"])
                                        .map((option)=> ({name: option.value.trim()}))

        const oldOptions = selectOptions.filter((option)=> !option["__isNew__"])
                                        .map((option)=> option.value)
        const newTopics = []
        for(let newOption of newOptions){
            const newTopic = await createTopic(newOption, auth?.accessTokens)
            newTopics.push(newTopic)
        }

        const topic_id = newTopics.map((topic)=> topic.id).concat(oldOptions)

        const payload = {
            title: inputTitle,
            description: inputDesc,
            visibility: inputVis,
            content: inputContent,
            topic_id: topic_id
        }

        if(!note){submit(payload, {method: "POST", action:"/notes", encType: "application/json"})}
        else{submit(payload, {method: "PUT", action:`/notes/${note!.id}`, encType: "application/json"})}
        
        
    }
    
    return (
        <div className="m-6 pb-50">
                <h2 className="text-2xl font-semibold mb-3">Create Note</h2>
                <Form className="flex flex-col gap-1.5" onSubmit={handleTopic}>
                    <label className="font-semibold">Title</label>
                    <Input 
                        type="text" 
                        name="title" 
                        onChange={(event)=> {
                            setInputTitle(event.target.value)
                        }}
                        value={inputTitle}
                    />
                    <label className="font-semibold">Description</label>
                    <Input 
                        type="text" 
                        name="description"
                        onChange={(event)=> {
                            setInputDesc(event.target.value)
                        }}
                        value={inputDesc} 
                    />
                    <label className="font-semibold">Visibility</label>
                    <div className="flex gap-1">
                        <input 
                            type="radio" 
                            name="visibility" 
                            value="public"
                            onChange={(e)=> setInputVis(e.target.value)}
                            checked={inputVis === "public"}

                        /> 
                        <label>Public</label>
                    </div>
                    <div className="flex gap-1">
                        <input 
                            type="radio" 
                            name="visibility" 
                            value="private"
                            onChange={(e)=> setInputVis(e.target.value)}
                            checked={inputVis === "private"}
                        /> 
                        <label>Private</label>
                    </div>
                    <label className="font-semibold">Content</label>
                    <textarea 
                        name="content" 
                        rows={6}
                        placeholder="พิมพ์เนื้อหาโน้ตของคุณที่นี่..."
                        className="w-full h-75 border border-main-contrast rounded-md px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(event)=> {
                            setInputContent(event.target.value)
                        }}
                        value={inputContent}
                    />
                    <label className="font-semibold">Tags</label>
                    <AsyncCreatableSelect 
                        isMulti 
                        loadOptions={loadOptions}
                        // new selected obj has __isNew__: true prop 
                        onChange={(selected: MultiValue<TopicOption>)=> {
                            setSelectOptions(selected)
                        }}
                        name="topic_id"
                        value={selectOptions}
                        isValidNewOption={(inputValue) => {
                            return inputValue.trim().length > 0;
                        }}
                    />
                    <Button type="submit">{note? "Update":"Create"}</Button>      
                </Form>
        </div>
    )
}