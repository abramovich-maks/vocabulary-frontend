import styled from "styled-components";
import {Card} from "../../components/Card";

export const ActionsRow = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.5rem;
    align-items: center;
`;


export const WordCard = styled(Card)`
    text-align: center;
    cursor: pointer;
    background-color: ${({theme}) => theme.card};

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.15);
    }
`;

export const WordHeader = styled.div`
    cursor: pointer;
    font-weight: 600;
    user-select: none;
    display: inline-block;
    color: ${({theme}) => theme.textPrimary};

    &:hover {
        text-decoration: underline;
    }
`;

export const EditFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.75rem;
`;

export const PaginationRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 1.5rem;
    flex-wrap: wrap;
`;

export const PageButton = styled.button<{ disabled?: boolean }>`
        padding: 0.4rem 0.9rem;
        border-radius: 20px;
        border: 1px solid ${({theme, disabled}) => disabled ? theme.textSecondary : theme.button};
        background-color: ${({theme, disabled}) => disabled ? theme.background : theme.card};
        color: ${({theme, disabled}) => disabled ? theme.textSecondary : theme.button};
        font-weight: 500;
        cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
        transition: all 0.2s ease;

        &:hover {
                ${({disabled}) => !disabled && `
        background-color: ${({theme}) => theme.button};
        color: ${({theme}) => theme.buttonText};
        `}
        }
`;

export const PageInfo = styled.span`
    font-weight: 500;
    color: ${({theme}) => theme.textSecondary};
    min-width: 90px;
    text-align: center;
`;