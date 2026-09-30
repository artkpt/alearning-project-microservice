import { fetchGet } from "@/utils/fetchUtils"

export async function getLessonById(id: string){
    const response = await fetchGet(import.meta.env.VITE_LESSON_API+ `/${id}`)
            if(!response.ok){throw new Error(response.status.toString())}
            const lesson = await response.json()
            return lesson
}