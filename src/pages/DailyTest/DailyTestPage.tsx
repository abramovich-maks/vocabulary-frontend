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

    useEffect(() => {
        getDailyTest()
            .then(res => {
                if (!res.data.questions || res.data.questions.length === 0) {
                    setMessage("No daily test available. Please come back tomorrow.");
                } else {
                    const shuffled = shuffleArray(res.data.questions);
                    setQuestions(shuffled);
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

    const handleNext = () => {
        const currentQuestion = questions[currentIndex];
        if (!answers[currentQuestion.id]) return;

        setCurrentIndex(prev => prev + 1);
    };

    const handleChange = (value: string) => {
        const questionId = questions[currentIndex].id;
        setAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }));
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
                value={answers[currentQuestion.id] || ""}
                onChange={e => handleChange(e.target.value)}
            />

            <div style={{marginTop: "16px"}}>
                {!isLast ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Finish</button>
                )}
            </div>
        </div>
    );
}
