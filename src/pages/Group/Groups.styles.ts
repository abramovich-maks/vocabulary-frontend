import styled from "styled-components";

// Page layout
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
    width: 60%;
    max-width: 1000px;
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
    margin-top: 1rem;
`;

export const Table = styled.table`
    width: 60%;
    max-width: 1000px;
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

    th:first-child {
        width: 45%;
    }

    th:nth-child(2) {
        width: 45%;
    }

    th:last-child {
        width: 10%;
        text-align: center;
    }

    td {
        padding: 12px 16px;
        border-bottom: 1px solid ${({theme}) => theme.background};
        color: ${({theme}) => theme.textPrimary};
    }

    td:last-child {
        text-align: center;
        padding: 8px;
    }

    tbody tr {
        cursor: pointer;
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

export const DropdownMenu = styled.div`
    position: absolute;
    top: 28px;
    right: 0;
    background: ${({theme}) => theme.card};
    border: 1px solid ${({theme}) => theme.textSecondary}33;
    border-radius: 8px;
    min-width: 140px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    z-index: 100;

    div {
        padding: 10px 14px;
        cursor: pointer;
        transition: background-color 0.15s ease;
        font-size: 0.9rem;

        &:first-child {
            border-radius: 8px 8px 0 0;
        }

        &:last-child {
            border-radius: 0 0 8px 8px;
        }

        &:hover {
            background: ${({theme}) => theme.background};
        }
    }
`;

export const ActionsButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 20px;
    padding: 4px 8px;
    color: ${({theme}) => theme.textSecondary};
    transition: color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${({theme}) => theme.textPrimary};
    }
`;

export const RemoveButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
    padding: 4px 8px;
    color: ${({theme}) => theme.textSecondary};
    transition: color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${({theme}) => theme.negative};
    }
`;

// Modal styles
export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
`;

export const ModalCard = styled.div`
    background: ${({theme}) => theme.card};
    padding: 24px;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    h3 {
        margin-top: 0;
        margin-bottom: 16px;
        color: ${({theme}) => theme.textPrimary};
    }
`;

// Details
export const DetailsCell = styled.td`
    padding: 0 !important;
    background-color: ${({theme}) => theme.background};

    > div {
        margin: 0;
    }
`;

export const DetailsContainer = styled.div`
    padding: 16px 20px;
    background-color: ${({theme}) => theme.background};
    border-radius: 8px;
    text-align: left;
    max-width: 100%;
`;

export const DetailSection = styled.div`
    margin-bottom: 12px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Label = styled.span`
    font-weight: 600;
    color: ${({theme}) => theme.textSecondary};
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 4px;
`;

export const Content = styled.p`
    margin: 0;
    color: ${({theme}) => theme.textPrimary};
    line-height: 1.5;
`;

export const AudioPlayer = styled.audio`
    width: 100%;
    margin-top: 4px;
`;

export const AlternativeList = styled.ul`
    margin: 4px 0 0 0;
    padding-left: 20px;
    color: ${({theme}) => theme.textPrimary};

    li {
        margin-bottom: 4px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const LoadingText = styled.p`
    color: ${({theme}) => theme.textSecondary};
    text-align: center;
    margin: 0;
    padding: 16px;
`;

export const NoDataText = styled.p`
    color: ${({theme}) => theme.textSecondary};
    text-align: center;
    margin: 0;
    padding: 16px;
    font-style: italic;
`;

// Button for creating groups
export const CreateGroupButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: ${({theme}) => theme.button};
    color: ${({theme}) => theme.buttonText};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s;
    margin-top: 1rem;

    &:hover {
        background: ${({theme}) => theme.buttonHover};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const CreateNewButton = styled.button`
    padding: 0.5rem;
    background: transparent;
    border: 1px solid ${({theme}) => theme.textSecondary}66;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    color: ${({theme}) => theme.textSecondary};
    transition: all 0.2s;

    &:hover {
        background: ${({theme}) => theme.card};
        color: ${({theme}) => theme.textPrimary};
        border-color: ${({theme}) => theme.button};
    }
`;

export const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid ${({theme}) => theme.textSecondary}66;
    border-radius: 8px;
    font-size: 1rem;
    background: ${({theme}) => theme.card};
    color: ${({theme}) => theme.textPrimary};
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.button};
    }

    option {
        background: ${({theme}) => theme.card};
        color: ${({theme}) => theme.textPrimary};
    }
`;

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
        font-size: 0.85rem;
        color: ${({theme}) => theme.textSecondary};
    }
`;