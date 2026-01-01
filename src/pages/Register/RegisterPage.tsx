import {useState} from "react";
import {register} from "../../composables/authApi";
import {useNavigate} from "react-router-dom";
import {Card} from "../../components/Card";

import {Button, ButtonsContainer, Container, ErrorText, Form, Input,} from "./RegisterPage.styles";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await register({
                username,
                surname,
                email,
                password,
            });

            navigate("/login");
        } catch {
            setError("Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    const isDisabled =
        submitting ||
        !username.trim() ||
        !surname.trim() ||
        !email.trim() ||
        !password.trim();

    return (
        <Card>
            <Container>
                <h2>Register</h2>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        type="text"
                        placeholder="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />

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
                        <Button type="submit" disabled={isDisabled}>
                            {submitting ? "Registering..." : "Register"}
                        </Button>
                    </ButtonsContainer>

                    {error && <ErrorText>{error}</ErrorText>}
                </Form>
            </Container>
        </Card>
    );
}
