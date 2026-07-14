import { createContext, useState } from "react";
import type { ReactNode } from "react";

const AuthContext = createContext({})

export function AuthProvider({children}:{children:ReactNode}){
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext