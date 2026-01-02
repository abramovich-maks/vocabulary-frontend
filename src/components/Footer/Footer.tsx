import {FooterLink, FooterRow, FooterWrapper} from './Footer.styles';

export const Footer = () => {
    return (
        <FooterWrapper>
            <FooterRow>
                Vocabulary SRS - Personal Project · Backend: Java & Spring Boot
            </FooterRow>

            <FooterRow>
                UI: React & TypeScript · © 2026 Maksim Abramovich ·{' '}
                <FooterLink
                    href="https://github.com/abramovich-maks"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </FooterLink>
            </FooterRow>
        </FooterWrapper>
    );
};