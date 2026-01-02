import styled from 'styled-components';

export const Button = styled.button`
    min-width: 7rem;
    padding: 0.6rem 1.2rem;

    font-size: 1rem;
    font-weight: 600;

    background-color: ${({theme}) => theme.button};
    color: ${({theme}) => theme.buttonText};

    border: none;
    border-radius: 0.6rem;
    cursor: pointer;

    transition: background-color 0.2s, transform 0.1s;

    &:hover:enabled {
        background-color: ${({theme}) => theme.buttonHover};
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
