import styled from "styled-components";
import {Card} from "../../components/Card";
import {Button} from "../../components/Button";

export const ActionsRow = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.5rem;
    align-items: center;
`;


export const GroupCard = styled(Card)`
    text-align: left;
    cursor: pointer;
    background-color: ${({theme}) => theme.card};

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.15);
    }
`;

export const GroupHeader = styled.div`
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

export const Label = styled.span`
    font-weight: 600;
    color: ${({theme}) => theme.textSecondary};
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const Content = styled.p`
    margin: 0.25rem 0 0 0;
    color: ${({theme}) => theme.textPrimary};
    line-height: 1.5;
`;


export const AlternativeList = styled.ul`
    margin: 0.25rem 0 0 0;
    padding-left: 1.5rem;
    color: ${({theme}) => theme.textPrimary};
`;

export const LoadingText = styled.p`
    color: ${({theme}) => theme.textSecondary};
    text-align: center;
    margin-top: 1rem;
`;

export const NoDataText = styled.p`
    color: ${({theme}) => theme.textSecondary};
    text-align: center;
    margin-top: 1rem;
    font-style: italic;
`;

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: ${({theme}) => theme.card};
    border-radius: 12px;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h2 {
        margin: 0;
        font-size: 1.5rem;
        color: ${({theme}) => theme.textPrimary};
    }
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: ${({theme}) => theme.textSecondary};
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${({theme}) => theme.textPrimary};
    }
`;

export const InputWrapper = styled.div`
    margin-bottom: 0.5rem;
`;

export const GroupName = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({theme}) => theme.textPrimary};
`;

export const ToggleIcon = styled.span<{ $isOpen: boolean }>`
    font-size: 0.75rem;
    color: ${({theme}) => theme.textSecondary};
    transform: ${({$isOpen}) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.2s;
`;

export const GroupBody = styled.div`
    padding: 1rem 1.25rem;
    border-top: 1px solid ${({theme}) => theme.textSecondary}33;
`;

export const EditForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.75rem;
    align-items: center;
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const DeleteButton = styled(Button)`
    background: ${({theme}) => theme.negative};

    &:hover {
        background: ${({theme}) => theme.negative}dd;
    }
`;

export const GroupField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    label {
        font-size: 0.85rem;
        color: ${({theme}) => theme.textSecondary};
    }
`;

export const CreateGroupButton = styled.button`
    padding: 1rem;
    background: ${({theme}) => theme.card};
    border: 2px dashed ${({theme}) => theme.textSecondary}66;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    color: ${({theme}) => theme.textPrimary};
    transition: all 0.2s;

    &:hover {
        background: ${({theme}) => theme.background};
        border-color: ${({theme}) => theme.button};
    }
`;

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h2 {
        margin: 0;
        font-size: 1.75rem;
        color: ${({theme}) => theme.textPrimary};
    }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 3rem 1rem;
    color: ${({theme}) => theme.textSecondary};

    p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
        color: ${({theme}) => theme.textSecondary};
    }
`;

export const ErrorMessage = styled.p`
    color: ${({theme}) => theme.negative};
    text-align: center;
    padding: 2rem;
`;