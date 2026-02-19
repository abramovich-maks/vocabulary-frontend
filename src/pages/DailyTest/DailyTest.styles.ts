import styled from "styled-components";

export const TestContainer = styled.div`
    max-width: 900px;
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

export const ResultSummary = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: ${({theme}) => theme.card};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ResultItem = styled.div`
    font-size: 1.1rem;
    color: ${({theme}) => theme.textPrimary};

    strong {
        font-weight: 700;
        color: ${({theme}) => theme.textHighlited};
    }
`;

export const TableContainer = styled.div`
    width: 100%;
    text-align: left;
    margin-top: 1.5rem;
`;

export const ResultTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: ${({theme}) => theme.card};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

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
        width: 30%;
    }

    th:nth-child(2) {
        width: 35%;
    }

    th:last-child {
        border-top-right-radius: 12px;
        width: 35%;
    }

    td {
        padding: 12px 16px;
        border-bottom: 1px solid ${({theme}) => theme.background};
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

export const ResultRow = styled.tr<{ $correct: boolean }>`
    background: ${({$correct}) =>
            $correct
                    ? 'rgba(76, 175, 80, 0.12)'  
                    : 'rgba(244, 67, 54, 0.12)'   
    };

    transition: background-color 0.2s ease;

    &:hover {
        background: ${({$correct}) =>
                $correct
                        ? 'rgba(76, 175, 80, 0.2)'  
                        : 'rgba(244, 67, 54, 0.2)'
        };
    }
`;

export const WordCell = styled.td`
    font-weight: 600;
    font-size: 1.05rem;
    color: ${({theme}) => theme.textPrimary};
`;

export const AnswerCell = styled.td`
    font-size: 0.95rem;
    color: ${({theme}) => theme.textPrimary};
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

export const ButtonContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
`;