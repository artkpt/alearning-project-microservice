import { fetchGet } from "../../../utils/fetchUtils"
import { useAuth } from "../../auth/stores/authStore"

export const getNoteById = async(id:string) => {
        const token = useAuth.getState().auth?.accessTokens
        const response = await fetchGet(import.meta.env.VITE_NOTE_API+ `/${id}`,{token})
        if(!response.ok){throw new Error(response.status.toString())}
        const note = await response.json()
        return note
}