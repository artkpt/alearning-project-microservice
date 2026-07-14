import {create} from "zustand"

interface User{
    userId: number;
    username: string;
    accessTokens: string;
    role: string;
}

interface AuthStore{
    auth: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuth = create<AuthStore>((set)=> ({
    auth: null,
    login: (user)=> set(() => ({ auth: user})),
    logout: () => set(()=> ({auth: null})),
}))