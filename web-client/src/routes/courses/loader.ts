import { useAuth } from "@/features/auth/stores/authStore"
import { checkEnrollment } from "@/features/course/checkEnrollment"
import { getCourseById } from "@/features/course/getCourseById"
import { getCourses } from "@/features/course/getCourses"
import { postEnrollment } from "@/features/course/postEnrollment"
import { createNote } from "@/features/note/api/createNote"
import { fetchGet } from "@/utils/fetchUtils"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"

export const getCoursesLoader = async() => { 
    return {
        courses: await getCourses()
    }
}

export const getCourseDetail = async({params}: LoaderFunctionArgs) => {
    const id = params.id as string
    try{
        const course = await getCourseById(id)
        const enrollment = await checkEnrollment(id)
        
        return { 
            course: course,
            enrollment: enrollment
        }

    }catch(e){
       console.log(e)
    }
}

export const enrollment = async({params}: LoaderFunctionArgs) => {
    const id = params.courseId as string
    try{
        const res = await postEnrollment(id)
    }
    catch(e){
        console.log(e)
    }
}

export const lessonAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const content = formData.get("content") as string
    const lessonId = formData.get("lessonId") as string

    const payload = {
        title: "new",
        visibility: "public",
        content: content,
        lesson_id: lessonId,
        description: null,
        topic_id: []
    }

    try{
        await createNote(payload)
    }
    catch(e){
        console.log(e)
    }
}

export const NoteOfLesson = async ({ params }: LoaderFunctionArgs) => {
    const token = useAuth.getState().auth?.access_token
      const { lessonId } = params;
      const response = await fetchGet(`/api/note/lessons/${lessonId}/notes`, {token});
      if (!response.ok) {
        throw new Response("Failed to fetch notes", { status: response.status });
      }
      return response.json();
    }