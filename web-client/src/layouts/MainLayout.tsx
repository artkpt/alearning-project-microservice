import { Header } from "../components/Header"
import { Outlet, ScrollRestoration } from "react-router"

export function MainLayout(){
    return (
        <>
            <Header className="mb-6"/>
            <Outlet />

            <ScrollRestoration />
        </>
            
        
    )
}