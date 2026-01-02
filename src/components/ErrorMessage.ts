import styled from 'styled-components';

export const ErrorMessage = styled.p`
    && {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: ${({theme}) => theme.negative};
        text-align: center;
    }
`;
