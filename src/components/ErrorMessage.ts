import styled from 'styled-components';

export const ErrorMessage = styled.div`
    margin-top: 1rem;
    font-size: 0.9rem;
    color: ${({theme}) => theme.negative};
    text-align: center;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-top: 0.25rem;
    }
`;