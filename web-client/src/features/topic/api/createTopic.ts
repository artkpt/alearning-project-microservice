import { fetchPost } from "../../../utils/fetchUtils"

export const createTopic = async(payload: Record<string, string | number | any[] >, token:string|undefined) => {
        const response = await fetchPost(import.meta.env.VITE_TOPIC_API,payload, {token})
        
        if(!response.ok){throw new Error(response.status.toString())}

        const newTopic = await response.json()
        return newTopic
}