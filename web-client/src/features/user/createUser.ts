import { fetchPost } from "../../utils/fetchUtils"
import { removeEmptyFields } from "../../utils/formUtils"
import { useAuth } from "../auth/stores/authStore"


export const createUser = async(
        payload: Record<string, string | number | any[] >,
) => {  
        const body = removeEmptyFields(payload)
        const token = useAuth.getState().auth?.access_token
        const response = await fetchPost(import.meta.env.VITE_USER_API, body, {token})
        if(!response.ok){ throw new Error(response.status.toString(), {cause:await response.json()})}
        const user = await response.json()
        return user
}