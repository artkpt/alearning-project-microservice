import { createBrowserRouter, redirect } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { NoteListPage } from "./notes/pages/NoteListPage";
import { NoteDetailPage } from "./notes/pages/NoteDetailPage";
import { NoteFormPage } from "./notes/pages/NoteFormPage";
import { createNoteAction, deleteNoteFetcher, editNoteLoader, getNoteByIdLoader, getNotesLoader, noteAction } from "./notes/loaderAction";
import { LoginPage } from "./login/LoginPage";
import { loginAction, logoutAction } from "./login/loginAction";
import { requireAuth } from "../features/auth/api/requireAuth";
import { UserFormPage } from "./users/UserFormPage";
import { createUserAction, createUserLoader } from "./users/loaderAction";
import { fetchGet } from "../utils/fetchUtils";
import { RegisterPage } from "./register/RegisterPage";
import { CourseListPage } from "./courses/CourseListPage";
import { enrollment, getCourseDetail, getCoursesLoader, getLessonByIdLoader, lessonAction, NoteOfLesson } from "./courses/loader";
import { CourseDetailPage } from "./courses/CourseDetailPage";
import LessonPage from "./courses/LessonPage";
import LearningPage from "./courses/LearningPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <h1>server ไม่ทำงาน</h1>,
    children: [
      {
        index: true,
        loader: () => { return redirect("/notes"); },
      },
      {
        path: "notes",
        loader: getNotesLoader,
        action: createNoteAction,
        Component: NoteListPage
      },
      {
        path: "notes/:id", 
        Component: NoteDetailPage,
        action: noteAction,
        loader: getNoteByIdLoader
      },
      {
        path: "notes/create", 
        Component: NoteFormPage,
        loader: ()=>{ 
          try{
            requireAuth()
          }catch(e){
            if(e instanceof Error && e.message === "401"){throw redirect("/login")}
          } 
        },
      },
      {
        path: "notes/:id/edit",
        Component: NoteFormPage,
        loader: editNoteLoader,
      },
      {
        path: 'users/create',
        Component: UserFormPage,
        action: createUserAction,
        loader: createUserLoader,
      },
      {
        path: '/courses',
        Component: CourseListPage,
        loader: getCoursesLoader
      },
      {
        path: '/courses/:courseId',
        Component: CourseDetailPage,
        loader: getCourseDetail,
      },
      {
        path: 'courses/:courseId/lessons/',
        Component: LearningPage,
        loader: getCourseDetail,
        id: 'learning-layout',
        children: [
          {
            path:':lessonId',
            Component: LessonPage,
            loader: getLessonByIdLoader,
            action: lessonAction
          }
        ]
      },
    ]
  },
  {
    path: '/register',
    Component: RegisterPage,
    action: createUserAction
  },
  {
    path: '/login',
    Component: LoginPage,
    action: loginAction
  },
  {
    path: "/api/notes/:id/delete",
    action: deleteNoteFetcher
  },
  {
    path: "/api/courses/:courseId/enrollments",
    action: enrollment
  },
  {
    path: "/api/lessons/:lessonId/notes",
    loader: NoteOfLesson
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "*",
    loader: ()=>{throw redirect("/")}
  }
])