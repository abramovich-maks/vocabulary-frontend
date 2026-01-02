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
