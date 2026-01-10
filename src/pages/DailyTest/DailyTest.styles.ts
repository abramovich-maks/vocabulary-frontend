import styled from "styled-components";

export const TestContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Instruction = styled.p`
    font-size: 1rem;
    color: ${({theme}) => theme.textSecondary};
    margin-bottom: 1rem;
`;

export const QuestionWord = styled.div`
    font-size: 2.2rem;
    font-weight: 800;
    margin: 2rem 0;
    color: ${({theme}) => theme.textPrimary};
    letter-spacing: -0.03em;
    text-transform: capitalize;
    text-align: center;
`;

export const AnswerInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 0.7rem;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid ${({theme}) => theme.textSecondary};
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.textPrimary};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
`;

export const ResultList = styled.div`
    margin-top: 1.5rem;
    text-align: left;
`;

export const ResultRow = styled.div<{ $correct: boolean }>`
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    margin-bottom: 0.6rem;
    border-radius: 8px;
    background-color: ${({theme}) => theme.background};
    border-left: 5px solid ${({$correct, theme}) => ($correct ? theme.positive : theme.negative)};
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const CorrectText = styled.span`
    font-weight: 600;
    font-size: 1.1rem;
    color: ${({theme}) => theme.textPrimary};
`;

export const UserAnswer = styled.span`
    font-size: 0.85rem;
    color: ${({theme}) => theme.negative};
    margin-top: 2px;
`;

export const StatusIcon = styled.span`
    font-size: 1.2rem;
    margin-left: 10px;
`;

export const Feedback = styled.p<{ $correct: boolean | null }>`
    margin-top: 1rem;
    font-weight: 600;
    color: ${({$correct, theme}) => $correct ? theme.positive : theme.negative};
`;

export const Progress = styled.p`
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: ${({theme}) => theme.textSecondary};
`;
export const ResultSummary = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1.5rem 0;
`;
export const ResultItem = styled.div`
    font-size: 1rem;

    strong {
        font-weight: 700;
    }
`;
