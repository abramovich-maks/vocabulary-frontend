import {useEffect, useState} from "react";
import {getDailyTest, submitDailyTest} from "../../composables/dailyTestApi";
import type {DailyTestControllerResponseDto, QuestionDto, UserAnswerRequestDto,} from "../../models/models";
import axios from "axios";

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
    const [result, setResult] = useState<DailyTestControllerResponseDto | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        getDailyTest()
            .then(res => {
                if (!res.data.questions || res.data.questions.length === 0) {
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

    const handleChange = (value: string) => {
        const questionId = questions[currentIndex].id;
        setAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleCheck = () => {
        const question = questions[currentIndex];
        const userAnswer = answers[question.id]?.trim().toLowerCase();
        const correctAnswer = question.answer.trim().toLowerCase();

        const correct = userAnswer === correctAnswer;

        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const handleNext = () => {
        setShowFeedback(false);
        setIsCorrect(null);
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

    if (loading) return <p>Loading daily test...</p>;

    if (message) {
        return (
            <div>
                <h2>Daily Test</h2>
                <p>{message}</p>
            </div>
        );
    }

    if (result) {
        return (
            <div>
                <h2>Result</h2>
                <p>Total: {result.total}</p>
                <p>Correct: {result.correct}</p>
                <p>Incorrect: {result.incorrect}</p>

                {result.answers.map(a => (
                    <div key={a.questionId}>
                        <p>
                            Your answer: {a.userAnswer} | Correct: {a.correctAnswer}
                            {a.correct ? " ✅" : " ❌"}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    return (
        <div>
            <h2>Daily Test</h2>

            <p>
                Question {currentIndex + 1} / {questions.length}
            </p>

            <p>
                {currentQuestion.prompt}{" "}
                <small>({currentQuestion.direction})</small>
            </p>

            <input
                type="text"
                disabled={showFeedback}
                value={answers[currentQuestion.id] || ""}
                onChange={e => handleChange(e.target.value)}
            />

            {showFeedback && (
                <p
                    style={{
                        color: isCorrect ? "green" : "red",
                        fontWeight: "bold",
                        marginTop: "8px",
                    }}
                >
                    Correct answer: {currentQuestion.answer}
                    {isCorrect ? " ✅" : " ❌"}
                </p>
            )}

            <div style={{marginTop: "16px"}}>
                {!showFeedback ? (
                    <button onClick={handleCheck}>Check</button>
                ) : !isLast ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Finish</button>
                )}
            </div>
        </div>
    );
}
