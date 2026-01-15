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

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
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
        background-color: ${({theme}) => theme.buttonHover};
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    font-size: 1rem;
    border: 1px solid ${({theme}) => theme.textSecondary};
    border-radius: 0.5rem;
    background-color: ${({theme}) => theme.card};
    color: ${({theme}) => theme.textPrimary};
    cursor: pointer;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.button};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    option {
        background-color: ${({theme}) => theme.card};
        color: ${({theme}) => theme.textPrimary};
    }
`;
