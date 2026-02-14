import styled from "styled-components";

export const PageContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    > p {
        text-align: center;
    }
`;

export const SearchContainer = styled.div`
    width: 90%;
    max-width: 1200px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-start;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 1rem;
    }
`;

export const SearchInput = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid ${({theme}) => theme.textSecondary}66;
    border-radius: 8px;
    font-size: 1rem;
    background: ${({theme}) => theme.card};
    color: ${({theme}) => theme.textPrimary};
    width: 100%;
    max-width: 400px;
    transition: border-color 0.2s ease;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.button};
    }

    &::placeholder {
        color: ${({theme}) => theme.textSecondary};
        opacity: 0.6;
    }
`;

export const TableContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Table = styled.table`
    width: 90%;
    max-width: 1200px;
    border-collapse: collapse;
    background: ${({theme}) => theme.card};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        width: 100%;
    }

    th {
        padding: 12px 16px;
        background: ${({theme}) => theme.background};
        text-align: left;
        font-weight: 600;
        color: ${({theme}) => theme.textSecondary};
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    th:first-child {
        border-top-left-radius: 12px;
    }

    th:last-child {
        border-top-right-radius: 12px;
    }

    th:nth-child(1) {
        width: 22%;
    }

    th:nth-child(2) {
        width: 22%;
    }

    th:nth-child(3) {
        width: 22%;
    }

    th:nth-child(4) {
        width: 34%;
    }

    td {
        padding: 12px 16px;
        border-bottom: 1px solid ${({theme}) => theme.background};
        color: ${({theme}) => theme.textPrimary};
    }

    tbody tr {
        transition: background-color 0.15s ease;
    }

    tbody tr:hover {
        background: ${({theme}) => theme.background};
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody tr:last-child td:first-child {
        border-bottom-left-radius: 12px;
    }

    tbody tr:last-child td:last-child {
        border-bottom-right-radius: 12px;
    }
`;

export const VerbCell = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const VerbForm = styled.span`
    font-weight: 600;
    color: ${({theme}) => theme.textPrimary};
    font-size: 1rem;
`;

export const Transcription = styled.span`
    font-size: 0.875rem;
    color: ${({theme}) => theme.textSecondary};
    font-style: italic;
`;

export const LoadingText = styled.p`
    color: ${({theme}) => theme.textSecondary};
    text-align: center;
    margin: 2rem 0;
    font-size: 1rem;
`;

export const ErrorText = styled.p`
    color: ${({theme}) => theme.negative};
    text-align: center;
    margin: 2rem 0;
    font-size: 1rem;
`;