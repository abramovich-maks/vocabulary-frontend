import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
    $isScrolled: boolean;
}

export const Header = styled.header<HeaderProps>`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    background-color: ${({theme}) => theme.background};
    border-bottom: 1px solid lightgrey;
    width: 100%;
    transition: background-color 0.5s;
    position: sticky;
    top: 0;
    z-index: 5;

    @media (min-width: 768px) {
        align-items: center;
        padding: 1.3rem;
        transition: background-color 0.5s, margin-top 0.2s, border-bottom 0.2s;
        margin-top: ${({$isScrolled}) => ($isScrolled ? '0' : '3rem')};
        border-bottom: ${({$isScrolled}) =>
                $isScrolled ? '1px solid lightgrey' : 'unset'};
    }
`;

export const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (min-width: 768px) {
        width: unset;
        justify-content: unset;
    }
`;

export const Logo = styled.div`
    color: ${({theme}) => theme.logo};
    font-size: 1.2rem;
    font-weight: 900;
    z-index: 2;
    @media (min-width: 768px) {
        margin-right: 1rem;
    }
`;

export const NavWrapper = styled.nav`
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: ${({theme}) => theme.background};
    border-top: 1px solid lightgrey;

    @media (min-width: 768px) {
        width: unset;
        position: unset;
        border-top: unset;
    }
`;

export const Nav = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0.75rem 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    scrollbar-width: none;     
    &::-webkit-scrollbar {
        display: none;    
    }
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    @media (min-width: 768px) {
        padding: 0;
    }
`;

export const StyledLink = styled(NavLink)`
    color: ${({theme}) => theme.textSecondary};
    padding: 0 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    position: relative;
    transition: color 0.3s;
    flex-shrink: 0;
    padding: 0 0.9rem;
    white-space: nowrap;
    :hover {
        color: ${({theme}) => theme.textPrimary};
    }

    @media (min-width: 768px) {
        margin: 0 0.4rem;
        padding: 0 0.5rem;
        font-size: 1rem;
        font-weight: unset;
        ::after {
            content: '';
            width: 0;
            height: 2px;
            background: ${({theme}) => theme.textHighlited};
            position: absolute;
            bottom: -0.5rem;
            right: 0%;
            transition: 0.3s;
        }

        :hover::after {
            width: 100%;
            left: 0%;
        }
    }
`;

export const HeaderInner = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
