import {useEffect, useState} from "react";
import axios from "axios";
import {getResult} from "../../composables/dailyTestApi";
import type {DailyTestResponseDto} from "../../models/models";
import {Button} from "../../components/Button";
import {ResultItem, ResultList, ResultRow, ResultSummary, TestContainer, Title, WrongAnswer} from "./DailyTest.styles";
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
                <Title>Daily Test</Title>
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
            <Title>🎉 Daily Test Completed</Title>

            <ResultSummary>
                <ResultItem>
                    <strong>Score:</strong> {result.correct} / {result.total}
                </ResultItem>
                <ResultItem>
                    <strong>Accuracy:</strong> {accuracy}%
                </ResultItem>
            </ResultSummary>

            <ResultList>
                {result.answers.map(answer => (
                    <ResultRow key={answer.questionId} $correct={answer.correct}>
                        <span>{answer.correctAnswer}</span>
                        {!answer.correct && (
                            <WrongAnswer>
                                your answer: {answer.userAnswer}
                            </WrongAnswer>
                        )}
                        <span>{answer.correct ? "✅" : "❌"}</span>

                    </ResultRow>
                ))}
            </ResultList>

            <Button onClick={() => navigate("/", {replace: true})}>
                Back to Home
            </Button>
        </TestContainer>
    );
}
