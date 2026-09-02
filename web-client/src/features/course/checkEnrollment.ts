import { fetchGet } from "@/utils/fetchUtils"
import { useAuth } from "../auth/stores/authStore"

export const checkEnrollment = async(id: string) => {
        const token = useAuth.getState().auth?.access_token
        const response = await fetchGet(`${import.meta.env.VITE_COURSE_API}/${id}/enrollments/me`, {token})
        if(response.status === 404){return {status: null}}
        if(!response.ok){throw new Error(response.status.toString())}
        const data = await response.json()
        return data
}