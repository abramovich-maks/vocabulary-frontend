import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;

    border-top: 1px solid lightgrey;
    width: 100%;
    padding: 1rem 0;

    font-size: 0.85rem;
    color: ${({theme}) => theme.textSecondary};
    text-align: center;
`;

export const FooterRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem;
`;

export const FooterLink = styled.a`
    color: ${({theme}) => theme.button || 'var(--primary)'};
    text-decoration: none;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;