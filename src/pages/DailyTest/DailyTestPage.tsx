import {useEffect, useState} from "react";
import axios from "axios";
import {getDailyTest} from "../../composables/dailyTestApi";
import type {QuestionDto} from "../../models/models";
import DailyTestQuestionItem from "./DailyTestQuestionItem";
import {TestContainer} from "./DailyTest.styles";

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
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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
                <h2>Daily Test</h2>
                <p>{message}</p>
            </TestContainer>
        );
    }

    const isLast = currentIndex === questions.length - 1;

    return (
        <TestContainer>
            <h2>Daily Test</h2>

            <DailyTestQuestionItem
                question={questions[currentIndex]}
                isLast={isLast}
                onNext={() => setCurrentIndex(i => i + 1)}
            />

            <>
                Question {currentIndex + 1} / {questions.length}
            </>
        </TestContainer>
    );
}
