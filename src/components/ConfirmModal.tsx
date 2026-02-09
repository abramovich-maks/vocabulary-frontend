import styled from "styled-components";
import {Button} from "./Button";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalCard = styled.div`
    background: ${({theme}) => theme.card};
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
    margin: 0 0 1rem 0;
    color: ${({theme}) => theme.textPrimary};
    font-size: 1.25rem;
`;

const ModalMessage = styled.p`
    margin: 0 0 1.5rem 0;
    color: ${({theme}) => theme.textSecondary};
    line-height: 1.5;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
`;

const CancelButton = styled(Button)`
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.textPrimary};
    
    &:hover {
        background: ${({theme}) => theme.card};
    }
`;

const ConfirmButton = styled(Button)`
    background: #dc3545;
    
    &:hover {
        background: #c82333;
    }
`;

interface Props {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
                                         title,
                                         message,
                                         confirmText = "Confirm",
                                         cancelText = "Cancel",
                                         onConfirm,
                                         onCancel
                                     }: Props) {
    return (
        <ModalOverlay onClick={onCancel}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <ModalTitle>{title}</ModalTitle>
                <ModalMessage>{message}</ModalMessage>
                <ButtonGroup>
                    <CancelButton onClick={onCancel}>
                        {cancelText}
                    </CancelButton>
                    <ConfirmButton onClick={onConfirm}>
                        {confirmText}
                    </ConfirmButton>
                </ButtonGroup>
            </ModalCard>
        </ModalOverlay>
    );
}