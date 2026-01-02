import styled from "styled-components";

export const TestContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
`;

export const Title = styled.h2`
    margin-bottom: 1.5rem;
`;

export const Instruction = styled.p`
    font-size: 1rem;
    color: ${({theme}) => theme.textSecondary};
    margin-bottom: 1rem;
`;

export const QuestionWord = styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin: 1.5rem 0;
`;

export const AnswerInput = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 0.7rem;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid ${({theme}) => theme.textSecondary};
`;

export const Feedback = styled.p<{ $correct: boolean | null }>`
    margin-top: 1rem;
    font-weight: 600;
    color: ${({$correct, theme}) =>
            $correct ? "green" : theme.negative};
`;

export const ButtonWrapper = styled.div`
    margin-top: 1.5rem;
`;

export const Progress = styled.p`
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: ${({theme}) => theme.textSecondary};
`;

export const ResultSummary = styled.div`
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
`;

export const ResultItem = styled.div`
    font-size: 1.1rem;
`;

export const ResultList = styled.div`
    margin-top: 1.5rem;
    text-align: left;
`;

export const ResultRow = styled.div<{ $correct: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid ${({theme}) => theme.textSecondary};
    color: ${({$correct, theme}) =>
            $correct ? "green" : theme.negative};
`;

export const WrongAnswer = styled.div`
    font-size: 0.85rem;
    color: ${({theme}) => theme.textSecondary};
    margin-top: 0.2rem;
`;

