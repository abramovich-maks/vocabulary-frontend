import styled from 'styled-components';

export const Card = styled.div`
    padding: 1rem;
    margin: 0.5rem 0;
    background-color: ${({theme}) => theme.card};
    border-radius: 0.8rem;
    box-shadow: 0 2px 8px -4px ${({theme}) => theme.textPrimary};
    transition: 0.3s;
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;

    @media (min-width: 1024px) {
        padding: 1rem 1.5rem;
    }
`;
