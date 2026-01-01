import {useState} from "react";
import {login} from "../../composables/authApi";
import {useAuth} from "../../composables/AuthContext";
import {useNavigate} from "react-router-dom";
import {Card} from '../../components/Card';
import {Button, ButtonsContainer, Container, ErrorText, Form, Input} from './LoginPage.styles';

export default function LoginPage() {
    const {loginSuccess} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await login({email, password});
            loginSuccess(res.data.token);
            navigate("/");
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <Card>
            <Container>
                <h2>Login</h2>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonsContainer>
                        <Button type="submit">Login</Button>
                    </ButtonsContainer>

                    {error && <ErrorText>{error}</ErrorText>}
                </Form>
            </Container>
        </Card>
    );
}
