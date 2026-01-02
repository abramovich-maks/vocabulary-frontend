import styled from "styled-components";

export const HeroBanner = styled.div`
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${({theme}) => theme.background};

    @media (min-width: 1024px) {
        padding: 6rem 0;
    }
`;

export const HeroImage = styled.div`
    position: fixed;
    left: 25px;
    bottom: 30px;
    width: 100%;
    height: 140vh;
    z-index: -1;
    pointer-events: none;
    display: none;
    @media (min-width: 1024px) {
        display: block;
    }

    img {
        width: 70%;
        height: 100%;
        object-fit: contain;
        object-position: left bottom;
        display: block;
        pointer-events: none;
    }
`;

export const HeroContent = styled.div`
    h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.2;
        margin: 0;
        transform: translateY(-2px);
        max-width: 25ch;
        color: ${({theme}) => theme.textPrimary};
        text-align: center;
    }

    span {
        color: ${({ theme }) => theme.textSecondary};
        display: inline-block;
        transition: transform 0.2s ease;
    }
`;

export const PlayLinkContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 3rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 600px;
`;

export const DescriptionSection = styled.section`
    margin: 4rem auto;
    padding: 0 1.5rem;
    max-width: 750px;
    text-align: center;

    color: ${({theme}) => theme.textPrimary};
    line-height: 1.6;

    h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: ${({theme}) => theme.textSecondary};
    }

    ol {
        display: inline-block;
        text-align: left;
        margin: 2rem auto 0;
        padding-left: 1.5rem;

        li {
            margin-bottom: 0.75rem;

            &::marker {
                color: ${({theme}) => theme.textSecondary};
                font-weight: bold;
            }
        }
    }
`;
