import { fetchGet, fetchPost } from "@/utils/fetchUtils"
import { useAuth } from "../auth/stores/authStore"

export const postEnrollment = async(id: string) => {
        const token = useAuth.getState().auth?.access_token
        const response = await fetchPost(`${import.meta.env.VITE_COURSE_API}/${id}/enrollments`, null, {token})
        if(!response.ok){throw new Error(response.status.toString())}
        const data = await response.json()
        return data
}