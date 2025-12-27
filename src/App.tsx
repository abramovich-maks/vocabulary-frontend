import LoginPage from "./auth/LoginPage";
import {useAuth} from "./auth/AuthContext";
import WordListPage from "./dictionary/WordListPage";

function App() {
    const {isAuthenticated, checkingAuth} = useAuth();

    if (checkingAuth) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <LoginPage/>;
    }

    return <WordListPage/>;
}

export default App;
