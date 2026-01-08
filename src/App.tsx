import {Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";

import {GlobalStyles} from "./components/GlobalStyles";
import {PageWrapper} from "./components/PageWrapper/PageWrapper";
import {useDarkMode} from "./composables/useDarkMode";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import WordListPage from "./pages/WordList/WordListPage";
import AddWordPage from "./pages/AddWord/AddWordPage";
import DailyTestPage from "./pages/DailyTest/DailyTestPage";
import DailyTestResultPage from "./pages/DailyTest/DailyTestResultPage";
import PrivateRoute from "./components/PrivateRoute";

import {darkTheme, lightTheme} from "./Theme";

export default function App() {
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeMode}>
                <GlobalStyles/>
                <PageWrapper theme={theme} toggleTheme={toggleTheme}>
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

                        <Route
                            path="/daily-test"
                            element={
                                <PrivateRoute>
                                    <DailyTestPage/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dailytest/result"
                            element={
                                <PrivateRoute>
                                    <DailyTestResultPage />
                                </PrivateRoute>
                            }
                        />                        <Route
                            path="/words/add"
                            element={
                                <PrivateRoute>
                                    <AddWordPage/>
                                </PrivateRoute>
                            }
                        />


                        <Route path="*" element={<div>404</div>}/>
                    </Routes>
                </PageWrapper>
        </ThemeProvider>
    );
}