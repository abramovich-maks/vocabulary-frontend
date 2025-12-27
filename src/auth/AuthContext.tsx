import { createContext, useContext, useState } from "react";

interface AuthContextValue {
    isAuthenticated: boolean;
    loginSuccess: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginSuccess = () => setIsAuthenticated(true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginSuccess }}>
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
