import styled from 'styled-components';
import {Card} from "./Card";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    width: 100%;
`;

export const AuthCard = styled(Card)`
    width: 100%;
    max-width: 420px;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`;


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    gap: 1rem;
`;

export const Input = styled.input`
    width: 100%;
    background-color: ${({theme}) => theme.card};
    color: ${({theme}) => theme.textPrimary};
    border: 1px solid ${({theme}) => theme.textPrimary};
    border-radius: 0.5rem;
    padding: 0.7rem;
    font-size: 1.2rem;
    text-align: center;
`;


export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    width: 100%;
`;

export const Button = styled.button`
    width: 100%;
    max-width: 300px;
    padding: 0.8rem;
    font-size: 1.2rem;
    background-color: ${({theme}) => theme.button};
    color: ${({theme}) => theme.buttonText};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover:enabled {
        background-color: ${({theme}) => theme.buttonHover};
    }
`;
