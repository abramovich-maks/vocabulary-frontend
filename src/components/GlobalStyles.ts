import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: 'Lato', sans-serif;
        color: ${({theme}) => theme.textPrimary};
        background-color: ${({theme}) => theme.background};
    + transition: background-color 0.5 s, color 0.5 s;
    }
`;
