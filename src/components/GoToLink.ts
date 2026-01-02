import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const GoToLink = styled(Link)<{
    $primary?: boolean;
    $secondary?: boolean;
}>`
    font-size: 1.05rem;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-weight: 600;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;

    ${({$primary, theme}) =>
            $primary &&
            `
      background: ${theme.button};
      color: ${theme.buttonText};
      box-shadow: 0 6px 20px ${theme.button}33;
    `}
    ${({$secondary, theme}) =>
            $secondary &&
            `
      color: ${theme.textSecondary};
      background: transparent;
      border: 1px solid ${theme.textSecondary};
    `}
    &:hover {
        transform: translateY(-2px);
    }

    ${({$secondary, theme}) =>
            $secondary &&
            `
      &:hover {
        background: ${theme.textSecondary}11;
      }
    `}
`;
