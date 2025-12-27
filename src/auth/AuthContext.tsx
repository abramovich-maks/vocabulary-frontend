import {createContext, useContext, useEffect, useState} from "react";
import {checkAuth} from "./authApi";

interface AuthContextValue {
    isAuthenticated: boolean;
    loginSuccess: () => void;
    checkingAuth: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const loginSuccess = () => setIsAuthenticated(true);

    useEffect(() => {
        checkAuth()
            .then(res => setIsAuthenticated(res.data.loggedIn === true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setCheckingAuth(false));
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, loginSuccess, checkingAuth}}>
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
