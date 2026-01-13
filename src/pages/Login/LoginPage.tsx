import {useState} from "react";
import {login} from "../../composables/authApi";
import {useAuth} from "../../composables/AuthContext";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from '../../components/ErrorMessage';
import {AuthCard, Button, ButtonsContainer, Container, Form, Input} from '../../components/AuthCard';

export default function LoginPage() {
    const {loginSuccess} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string[] | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await login({ email, password });
            loginSuccess(res.data.token);
            navigate("/");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <Container>
            <AuthCard>
                <h2>Login</h2>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <ButtonsContainer>
                        <Button type="submit">Login</Button>
                    </ButtonsContainer>

                    {error && (
                        <ErrorMessage>
                            <ul>
                                {error.map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        </ErrorMessage>
                    )}
                </Form>
            </AuthCard>
        </Container>
    );

}