import { createContext, useContext, useState } from "react";
import { logout as logoutApi } from "./authApi";
import { authStore } from "./authStore";

interface AuthContextValue {
    isAuthenticated: boolean;
    loginSuccess: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginSuccess = (token: string) => {
        authStore.setAccessToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        logoutApi().finally(() => {
            authStore.setAccessToken(null);
            setIsAuthenticated(false);
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginSuccess, logout }}>
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
