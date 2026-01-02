import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0rem;
    min-height: 80vh;
    width: 100%;

    p {
        color: ${({theme}) => theme.textSecondary};
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
`;

export const Button = styled.button`
    width: 100%;
    max-width: 200px;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    font-size: 1.2rem;
    background-color: ${({theme}) => theme.button};
    color: ${({theme}) => theme.buttonText};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 0.3s;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:hover:enabled {
        background-color: ${({ theme }) => theme.buttonHover};
    }
`;