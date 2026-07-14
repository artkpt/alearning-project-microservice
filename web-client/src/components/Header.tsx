import { useState } from "react"
import { Input } from "./BaseComponents/Input"
import { Link } from "react-router"
import { LinkButton } from "./BaseComponents/LinkButton"
import { ProfileIcon } from "../features/profile/ProfileIcon"
import { useAuth } from "../features/auth/stores/authStore"

export function Header({className=""}){
    const {auth} = useAuth()
    const [openMenu, setOpenMenu] = useState(false)
    const menuList = [{
        name: "Home",
        link: "/"

    },
    {
        name: "Notes",
        link: "/notes"

    },]

    const menuOpen = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <>
        <header className={`flex items-center justify-between min-h-16 px-4 py-4 border-b  border-main-contrast gap-2 flex-nowrap ${className}`}>
            <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md text-grey-600 shrink-0 hover:bg-gray-50 cursor-pointer" onClick={menuOpen}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-4"
                >
                    <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                    />
                </svg>
            </button>
            <img src="/logo.jpg" alt="logo" width="773" height="752" className="w-8 h-8 shrink-0" />
            <div className="grow shrink flex gap-2 justify-between">
                <h1 className="hidden sm:block font-sans text-xl font-semibold cursor-pointer">
                    <Link to="/">Alearning</Link>
                </h1>
            <Input type="text" name="search" />
            </div>           
            {!auth && <LinkButton to="/login">Sign in</LinkButton>}
            {auth && <ProfileIcon />}
        </header>
        {/* Sidebar */}
        
            {/* FIXME: z-50 */}
            {openMenu && (
                <div className="fixed inset-0 flex z-50">

                    {/* overlay */}
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setOpenMenu(false)}
                    />

                    {/* sidebar */}
                    <div className="relative w-64 bg-white h-full shadow-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Menu</h2>
                        <ul className="space-y-2">
                            {
                                menuList.map((menu) => {   
                                    return (
                                        <li key={menu.name}>
                                            <Link 
                                                to={menu.link} 
                                                onClick={() => setOpenMenu(false)} 
                                                className="block px-3 py-2 rounded-md hover:bg-gray-100"
                                            >
                                                {menu.name}
                                            </Link>
                                        </li>
                                    )       
                                }   
                            )}
                        </ul> 
                    </div>
                </div>
            )}
        </>
    )
}