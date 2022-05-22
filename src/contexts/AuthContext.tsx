import Router from "next/router";
import { destroyCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credencials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined,'@nextauth.token');
        Router.push('/');
    } catch {
        console.log('Erro ao sair do sistema');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({email, password}: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });
            const { id, name, token } = response.data;
            setUser({
                id,
                name,
                email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            Router.push('/dashboard');
        } catch (err) {

        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}