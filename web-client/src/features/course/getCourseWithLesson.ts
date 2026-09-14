import { fetchGet } from "@/utils/fetchUtils"

export const getCourseWithLesson = async(id: string) => {
        const response = await fetchGet(import.meta.env.VITE_COURSE_API+`/${id}/lessons`)
        if(!response.ok){throw new Error(response.status.toString())}
        const courses = await response.json()
        return courses
}