import { fetchGet } from "@/utils/fetchUtils"

export const getCourses = async() => {
        const response = await fetchGet(import.meta.env.VITE_COURSE_API)
        if(!response.ok){throw new Error(response.status.toString())}
        const courses = await response.json()
        return courses
}