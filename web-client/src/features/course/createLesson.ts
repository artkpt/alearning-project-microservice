import { useAuth } from "../auth/stores/authStore"


export const createLesson = async (courseId: string, formData: FormData) => {
        const token = useAuth.getState().auth?.access_token
        const response = await fetch(`${import.meta.env.VITE_COURSE_API}/${courseId}/lessons`, {
                method: "POST",
                headers: {
                        "Authorization": `Bearer ${token}`
                },
                body: formData, 
        });
       
        if(!response.ok){ throw new Error(response.status.toString())}
        const newLesson = await response.json()
        return newLesson
}