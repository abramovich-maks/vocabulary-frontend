import styled from 'styled-components';

export const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: 2rem;
        margin-bottom: 0.6rem;
    }

    p {
        font-size: 1.1rem;
        text-align: center;
        max-width: 600px;
    }

    @media (min-width: 1024px) {
        h2 {
            font-size: 2.6rem;
            margin-top: 4rem;
        }
    }
`;
