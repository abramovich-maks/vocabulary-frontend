import { useState } from "react";
import { register } from "../../composables/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await register({
                username,
                surname,
                email,
                password,
            });

            navigate("/login");
        } catch (err: any) {
            setError("Registration failed");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />

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

                <button type="submit">Register</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
