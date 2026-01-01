import styled from "styled-components";

export const HeroBanner = styled.div`
    padding: 2rem 1rem;
    display: flex;
    justify-content: center;
    width: 100%;

    @media (min-width: 1024px) {
        padding: 4rem 0;
    }
`;

export const HeroContent = styled.div`
    h1 {
        font-size: 2rem;
        margin: 0;
        max-width: 22ch;
        color: ${({ theme }) => theme.textSecondary};
        text-align: center;
    }

    span {
        color: ${({ theme }) => theme.textPrimary};
    }

    @media (min-width: 1024px) {
        h1 {
            font-size: 3rem;
        }
    }
`;

export const PlayLinkContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
    flex-wrap: wrap;
`;

export const DescriptionSection = styled.section`
    margin: 4rem auto;
    max-width: 700px;
    text-align: center;
    font-size: 1.1rem;

    h2 {
        margin-bottom: 1rem;
    }

    ol {
        text-align: left;
        margin-top: 1.5rem;
    }
`;
