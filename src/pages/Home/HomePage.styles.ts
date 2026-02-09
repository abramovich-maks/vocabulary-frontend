import styled from "styled-components";

export const PageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
`;

export const HeroBanner = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media (min-width: 768px) {
        padding: 4rem 0;
    }
`;

export const HeroContent = styled.div`
    h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.3;
        margin: 0;
        color: ${({theme}) => theme.textPrimary};
        font-weight: 700;

        span {
            color: ${({theme}) => theme.button};
            display: inline;
        }
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2.5rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 600px;
`;

export const Section = styled.section`
    width: 100%;
    max-width: 900px;
    margin: 3rem auto 0;
    text-align: center;
`;

export const SectionTitle = styled.h2<{icon?: string}>`
    font-size: 1.5rem;
    margin: 0 0 0.75rem 0;
    color: ${({theme}) => theme.textPrimary};
    font-weight: 600;

    &::before {
        content: '${props => props.icon || '🔹'}';
        margin-right: 0.5rem;
    }
`;

export const SectionDescription = styled.p`
    font-size: 1.1rem;
    color: ${({theme}) => theme.textSecondary};
    line-height: 1.7;
    margin: 0 0 2rem 0;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
`;

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const FeatureCard = styled.div`
    padding: 2rem;
    background: ${({theme}) => theme.card};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    h3 {
        margin: 0 0 0.75rem 0;
        font-size: 1.25rem;
        color: ${({theme}) => theme.textPrimary};
        font-weight: 600;
    }
    
    p {
        margin: 0;
        font-size: 1rem;
        color: ${({theme}) => theme.textSecondary};
        line-height: 1.6;
    }
`;

export const ComingSoonList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 2rem auto 0;
    max-width: 600px;
    text-align: left;
    
    li {
        padding: 1rem 1.5rem;
        margin-bottom: 0.75rem;
        background: ${({theme}) => theme.card};
        border-radius: 8px;
        color: ${({theme}) => theme.textPrimary};
        font-size: 1rem;
        line-height: 1.6;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        
        &:last-child {
            margin-bottom: 0;
        }
        
        &::before {
            content: '✨ ';
            margin-right: 0.5rem;
        }
    }
`;

export const TagLine = styled.p`
    font-size: 1.15rem;
    color: ${({theme}) => theme.textSecondary};
    margin: 2.5rem 0 0 0;
    font-style: italic;
    font-weight: 500;
`;