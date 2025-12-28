import {Route, Routes} from "react-router-dom";
import {useAuth} from "./composables/AuthContext";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import WordListPage from "./pages/Dictionary/WordListPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const {checkingAuth} = useAuth();

    if (checkingAuth) {
        return <p>Loading...</p>;
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>

            <Route
                path="/words"
                element={
                    <PrivateRoute>
                        <WordListPage/>
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<div>404</div>}/>
        </Routes>
    );
}

export default App;
