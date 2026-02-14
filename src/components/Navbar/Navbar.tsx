import {useEffect, useState} from 'react';
import {useAuth} from '../../composables/AuthContext';
import {ThemeToggler} from '../ThemeToggler/ThemeToggler';
import {Header, HeaderInner, Logo, LogoContainer, Nav, NavWrapper, StyledLink} from './Navbar.styles';
import ConfirmModal from '../ConfirmModal';

export const Navbar = ({toggleTheme, theme}: any) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const {logout, isAuthenticated} = useAuth();

    useEffect(() => {
        const headerScrollAnimation = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', headerScrollAnimation);
        return () => window.removeEventListener('scroll', headerScrollAnimation);
    }, []);

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLogoutConfirm(true);
    };

    const handleConfirmLogout = () => {
        logout();
        setShowLogoutConfirm(false);
    };

    return (
        <>
            <Header $isScrolled={isScrolled}>
                <HeaderInner>
                    <LogoContainer>
                        <Logo>Vocabulary SRS</Logo>
                        <ThemeToggler toggleTheme={toggleTheme} theme={theme}/>
                    </LogoContainer>
                    <NavWrapper>
                        <Nav>
                            {!isAuthenticated ? (
                                <>
                                    <StyledLink to="/">Home</StyledLink>
                                    <StyledLink to="/register">Register</StyledLink>
                                    <StyledLink to="/login">Login</StyledLink>
                                </>
                            ) : (
                                <>
                                    <StyledLink to="/">Home</StyledLink>
                                    <StyledLink to="/verbs">Irregular Verbs</StyledLink>
                                    <StyledLink to="/words">Dictionary</StyledLink>
                                    <StyledLink to="/groups">Groups</StyledLink>
                                    <StyledLink to="/daily-test">Daily test</StyledLink>
                                    <StyledLink to="/words/add">Add word</StyledLink>
                                    <StyledLink to="/login" onClick={handleLogoutClick}>Logout</StyledLink>
                                </>
                            )}
                        </Nav>
                    </NavWrapper>
                </HeaderInner>
            </Header>

            {showLogoutConfirm && (
                <ConfirmModal
                    title="Confirm Logout"
                    message="Are you sure you want to log out?"
                    confirmText="Logout"
                    cancelText="Cancel"
                    onConfirm={handleConfirmLogout}
                    onCancel={() => setShowLogoutConfirm(false)}
                />
            )}
        </>
    );
}