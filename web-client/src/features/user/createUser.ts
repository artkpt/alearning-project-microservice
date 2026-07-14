import { fetchPost } from "../../utils/fetchUtils"
import { useAuth } from "../auth/stores/authStore"


export const createUser = async(
        payload: Record<string, string | number | any[] >,
) => {
        const token = useAuth.getState().auth?.accessTokens
        const response = await fetchPost(import.meta.env.VITE_USER_API, payload, {token})
        if(!response.ok){ throw new Error(response.status.toString(), {cause:await response.json()})}
        const user = await response.json()
        return user
}