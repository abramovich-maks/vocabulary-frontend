import LoginPage from "./auth/LoginPage";
import { useAuth } from "./auth/AuthContext";
import WordListPage from "./dictionary/WordListPage";

function App() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return <WordListPage />;
}

export default App;
