import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    padding: 0.6rem;

    font-size: 1.1rem;
    text-align: center;

    background-color: ${({theme}) => theme.card};
    color: ${({theme}) => theme.textPrimary};

    border: 1px solid ${({theme}) => theme.textSecondary};
    border-radius: 0.5rem;

    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.button};
    }
`;
