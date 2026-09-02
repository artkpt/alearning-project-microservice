import { fetchGet } from "@/utils/fetchUtils"

export const getCourseById = async(id:string) => {
        const response = await fetchGet(import.meta.env.VITE_COURSE_API+ `/${id}`)
        if(!response.ok){throw new Error(response.status.toString())}
        const course = await response.json()
        return course
}