import { useState } from "react";
import { login } from "./authApi";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ email, password });
            console.log("LOGIN OK");
        } catch (err: any) {
            setError("Invalid credentials");
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
