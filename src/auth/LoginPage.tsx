import {useState} from "react";
import {login} from "./authApi";
import {useAuth} from "./AuthContext";

export default function LoginPage() {
    const {loginSuccess} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login({email, password});
            loginSuccess();
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={{maxWidth: 400, margin: "100px auto"}}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </div>
    );
}
