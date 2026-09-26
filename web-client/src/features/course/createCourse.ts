import { useAuth } from "../auth/stores/authStore"


export const createCourse = async (formData: FormData) => {
        const token = useAuth.getState().auth?.access_token
        const response = await fetch(import.meta.env.VITE_COURSE_API, {
                method: "POST",
                headers: {
                        "Authorization": `Bearer ${token}`
                },
                body: formData, 
        });
       
        if(!response.ok){ throw new Error(response.status.toString())}
        const newCourse = await response.json()
        return newCourse
}