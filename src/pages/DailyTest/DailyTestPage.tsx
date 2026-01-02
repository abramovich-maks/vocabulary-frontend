import {useEffect, useState} from "react";
import axios from "axios";
import {getDailyTest, submitDailyTest,} from "../../composables/dailyTestApi";
import type {DailyTestControllerResponseDto, QuestionDto, UserAnswerRequestDto,} from "../../models/models";
import {Button} from "../../components/Button";
import {
    AnswerInput,
    ButtonWrapper,
    Feedback,
    Instruction,
    Progress,
    QuestionWord,
    ResultItem,
    ResultList,
    ResultRow,
    ResultSummary,
    TestContainer,
    Title,
    WrongAnswer
} from "./DailyTest.styles";

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export default function DailyTestPage() {
    const [questions, setQuestions] = useState<QuestionDto[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] =
        useState<DailyTestControllerResponseDto | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [feedback, setFeedback] = useState<{
        correct: boolean;
        correctAnswer: string;
    } | null>(null);

    useEffect(() => {
        getDailyTest()
            .then(res => {
                if (!res.data.questions?.length) {
                    setMessage("No daily test available. Please come back tomorrow.");
                } else {
                    setQuestions(shuffleArray(res.data.questions));
                }
            })
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    setMessage(
                        err.response?.data?.message ??
                        "Daily test is already completed. Please come back tomorrow."
                    );
                } else {
                    setMessage("Unexpected error occurred.");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading daily test...</p>;

    if (message) {
        return (
            <TestContainer>
                <Title>Daily Test</Title>
                <p>{message}</p>
            </TestContainer>
        );
    }

    if (result) {
        const accuracy = Math.round(
            (result.correct / result.total) * 100
        );

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
                    {result.answers.map(a => (
                        <ResultRow key={a.questionId} $correct={a.correct}>
                        <span>
                            {a.correctAnswer}
                        </span>

                            <span>
                            {a.correct ? "✅" : "❌"}
                        </span>

                            {!a.correct && (
                                <WrongAnswer>
                                    your answer: {a.userAnswer}
                                </WrongAnswer>
                            )}
                        </ResultRow>
                    ))}
                </ResultList>

                <ButtonWrapper>
                    <Button onClick={() => window.location.reload()}>
                        Back to Home
                    </Button>
                </ButtonWrapper>
            </TestContainer>
        );
    }


    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const instruction =
        currentQuestion.direction === "WORD_TO_TRANSLATION"
            ? "Translate the word into your language"
            : "Translate into English";

    const handleChange = (value: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value,
        }));
    };

    const handleCheck = () => {
        const userAnswer = answers[currentQuestion.id]?.trim().toLowerCase();
        const correctAnswer = currentQuestion.answer.trim().toLowerCase();

        setFeedback({
            correct: userAnswer === correctAnswer,
            correctAnswer: currentQuestion.answer,
        });
    };

    const handleNext = () => {
        setFeedback(null);
        setCurrentIndex(prev => prev + 1);
    };

    const handleSubmit = async () => {
        const payload: UserAnswerRequestDto[] = questions.map(q => ({
            questionId: q.id,
            answer: answers[q.id] ?? "",
        }));

        const res = await submitDailyTest(payload);
        setResult(res.data);
    };

    return (
        <TestContainer>
            <Title>Daily Test</Title>

            <Instruction>{instruction}</Instruction>

            <QuestionWord>{currentQuestion.prompt}</QuestionWord>

            <AnswerInput
                type="text"
                disabled={feedback !== null}
                value={answers[currentQuestion.id] || ""}
                onChange={e => handleChange(e.target.value)}
            />

            {feedback && (
                <Feedback $correct={feedback.correct}>
                    Correct answer: {feedback.correctAnswer}
                    {feedback.correct ? " ✅" : " ❌"}
                </Feedback>
            )}

            <ButtonWrapper>
                {!feedback ? (
                    <Button onClick={handleCheck}>Check</Button>
                ) : !isLast ? (
                    <Button onClick={handleNext}>Next</Button>
                ) : (
                    <Button onClick={handleSubmit}>Finish</Button>
                )}
            </ButtonWrapper>

            <Progress>
                Question {currentIndex + 1} / {questions.length}
            </Progress>
        </TestContainer>
    );
}
