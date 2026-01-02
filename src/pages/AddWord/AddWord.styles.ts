import styled from 'styled-components';
import {Card} from '../../components/Card';

export const FormAddedWord = styled.form`
    width: 100%;
    max-width: 480px;
`;

export const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: stretch;
    padding: 2rem;
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    width: 100%;
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