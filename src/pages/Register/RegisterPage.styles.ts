import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0rem;
    p {
        color: ${({ theme }) => theme.textSecondary};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;

export const Input = styled.input`
    width: 100%;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.textPrimary};
    border: 1px solid ${({ theme }) => theme.textPrimary};
    border-radius: 0.5rem;
    margin: 0.5rem 0;
    padding: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
    transition: 0.3s;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
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
    background-color: ${({ theme }) => theme.button};
    color: ${({ theme }) => theme.textPrimary};
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

export const ErrorText = styled.p`
  margin-top: 0.5rem;
  color: red;
  text-align: center;
`;
