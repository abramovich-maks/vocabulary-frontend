import {useState} from "react";
import {register} from "../../composables/authApi";
import {useNavigate} from "react-router-dom";
import {AuthCard, Button, ButtonsContainer, Container, Form, Input} from '../../components/AuthCard';
import {Select} from './RegisterPage.styles'
import {ErrorMessage} from '../../components/ErrorMessage';

const LANGUAGES = [
    { value: "RU", label: "Русский (RU)" },
    { value: "PL", label: "Polski (PL)" },
    { value: "DE", label: "Deutsch (DE)" },
];

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [language, setLanguage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string[] | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await register({
                username,
                surname,
                language,
                email,
                password,
            });

            navigate("/login");
        } catch (err: any) {
            const apiError = err?.response?.data;

            if (Array.isArray(apiError?.message)) {
                setError(apiError.message);
            } else if (typeof apiError?.message === "string") {
                setError([apiError.message]);
            } else {
                setError(["Registration failed"]);
            }
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Container>
            <AuthCard>
                <h2>Register</h2>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <Input
                        type="text"
                        placeholder="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />

                    <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select language</option>
                        {LANGUAGES.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </Select>

                    <ButtonsContainer>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? "Registering..." : "Register"}
                        </Button>
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