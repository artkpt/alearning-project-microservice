import { useAuth } from "@/features/auth/stores/authStore"
import { checkEnrollment } from "@/features/course/checkEnrollment"
import { getCourseById } from "@/features/course/getCourseById"
import { getCourses } from "@/features/course/getCourses"
import { getCourseWithLesson } from "@/features/course/getCourseWithLesson"
import { getLessonById } from "@/features/course/getLessonById"
import { postEnrollment } from "@/features/course/postEnrollment"
import { createNote } from "@/features/note/api/createNote"
import { fetchGet } from "@/utils/fetchUtils"
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router"

export const getCoursesLoader = async() => { 
    return {
        courses: await getCourses()
    }
}

export const getCourseDetail = async({params}: LoaderFunctionArgs) => {
    const id = params.courseId as string
    const auth = useAuth.getState().auth
    try{
        const course = await getCourseById(id)
        let enrollment = null
        if(auth){
            enrollment = await checkEnrollment(id)
        }
        
        return { 
            course: course,
            enrollment: enrollment
        }

    }catch(e){
       if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
    }
}

export const getLessonOfCourse = async({params}: LoaderFunctionArgs) => {
    const id = params.id as string
    try{
        const course = await getCourseWithLesson(id)
        
        return { 
            course: course
        }

    }catch(e){
       if(e instanceof Error && e.message === "401"){ throw redirect('/login')}
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

export const getLessonByIdLoader = async ({ params }: LoaderFunctionArgs) => {
    const lessonId = params.lessonId as string
    return {
        lesson: await getLessonById(lessonId)
    }
}