import {useEffect, useState} from "react";
import axios from "axios";
import {getResult} from "../../composables/dailyTestApi";
import type {DailyTestResponseDto} from "../../models/models";
import {Button} from "../../components/Button";
import {
    AnswerCell,
    ButtonContainer,
    ResultItem,
    ResultRow,
    ResultSummary,
    ResultTable,
    TableContainer,
    TestContainer,
    WordCell
} from "./DailyTest.styles";
import {useNavigate} from "react-router-dom";

export default function DailyTestResultPage() {
    const [result, setResult] = useState<DailyTestResponseDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getResult()
            .then(res => setResult(res.data))
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message ?? "Failed to load test result");
                } else {
                    setError("Unexpected error occurred");
                }
            });
    }, []);

    if (error) {
        return (
            <TestContainer>
                <h2>Daily Test</h2>
                <p>{error}</p>
            </TestContainer>
        );
    }

    if (!result) {
        return <p>Loading results...</p>;
    }

    const accuracy = Math.round((result.correct / result.total) * 100);

    return (
        <TestContainer>
            <h2>🎉 Daily Test Completed</h2>

            <ResultSummary>
                <ResultItem>
                    <strong>Score:</strong> {result.correct} / {result.total}
                </ResultItem>
                <ResultItem>
                    <strong>Accuracy:</strong> {accuracy}%
                </ResultItem>
            </ResultSummary>

            <TableContainer>
                <ResultTable>
                    <thead>
                    <tr>
                        <th>Word</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                    </tr>
                    </thead>

                    <tbody>
                    {result.answers.map(answer => (
                        <ResultRow key={answer.questionId} $correct={answer.correct}>
                            <WordCell>{answer.word}</WordCell>

                            <AnswerCell>
                                {answer.userAnswer}
                            </AnswerCell>

                            <AnswerCell>
                                {answer.correctAnswer}
                            </AnswerCell>
                        </ResultRow>
                    ))}
                    </tbody>
                </ResultTable>
            </TableContainer>

            <ButtonContainer>
                <Button onClick={() => navigate("/", {replace: true})}>
                    Back to Home
                </Button>
            </ButtonContainer>
        </TestContainer>
    );
}