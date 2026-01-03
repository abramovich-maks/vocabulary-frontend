import type {ReactNode} from 'react';
import {createContext, useContext, useEffect, useState} from "react";
import {logout as logoutApi, refresh} from "./authApi";
import {authStore} from "./authStore";

interface AuthContextValue {
    isAuthenticated: boolean;
    loginSuccess: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(authStore.isAuthenticated());

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await refresh();
                authStore.setAccessToken(res.data.token);
            } catch {
                authStore.clear();
            }
        };

        initAuth();

        return authStore.subscribe(() => {
            setIsAuthenticated(authStore.isAuthenticated());
        });
    }, []);


    const loginSuccess = (token: string) => {
        authStore.setAccessToken(token);
    };

    const logout = () => {
        logoutApi().finally(() => {
            authStore.clear();
        });
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, loginSuccess, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}
