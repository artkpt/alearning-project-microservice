import { createBrowserRouter, redirect } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { NoteListPage } from "./notes/pages/NoteListPage";
import { NoteDetailPage } from "./notes/pages/NoteDetailPage";
import { NoteFormPage } from "./notes/pages/NoteFormPage";
import { createNoteAction, deleteNoteFetcher, editNoteLoader, getNoteByIdLoader, getNotesLoader, noteAction } from "./notes/loaderAction";
import { LoginPage } from "./login/pages/LoginPage";
import { loginAction, logoutAction } from "./login/loginAction";
import { requireAuth } from "../features/auth/api/requireAuth";
import { UserFormPage } from "./users/UserFormPage";
import { createUserAction, createUserLoader } from "./users/loaderAction";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <h1>server ไม่ทำงาน</h1>,
    children: [
      {
        index: true,
        element: <></>,
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
      }
    ]
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
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "*",
    loader: ()=>{throw redirect("/")}
  }
])