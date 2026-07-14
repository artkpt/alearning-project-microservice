import { fetchGet } from "../../../utils/fetchUtils"

export const getTopicByName = async(params:{search?: string}) => {
        const response = await fetchGet(`${import.meta.env.VITE_TOPIC_API}`,{params})
        if(!response.ok){throw new Error(response.status.toString())}
        const topics = await response.json()
        return topics
}