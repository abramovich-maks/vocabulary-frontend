import {useState} from "react";
import {answerQuestion} from "../../composables/dailyTestApi";
import {Button} from '../../components/Button';
import {ErrorMessage} from "../../components/ErrorMessage";
import type {QuestionDto} from "../../models/models";
import {useNavigate} from "react-router-dom";
import {AnswerInput, Instruction, QuestionWord,UserAnswer,Feedback} from "./DailyTest.styles"

interface Props {
    question: QuestionDto;
    isLast: boolean;
    onNext: () => void;
}

export default function DailyTestQuestionItem({question, isLast, onNext,}: Props) {
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<{
        correct: boolean;
        correctAnswer: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const instruction = question.direction === "WORD_TO_TRANSLATION"
        ? "Translate the word into your language"
        : "Translate into English";

    const handleCheck = async () => {
        if (!answer.trim()) {
            setError("Answer cannot be empty");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const res = await answerQuestion(question.id, answer.trim());

            setFeedback({
                correct: res.data.correct,
                correctAnswer: res.data.correctAnswer,
            });
        } catch {
            setError("Failed to submit answer");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setAnswer("");
        setFeedback(null);
        onNext();
    };

    const handleFinish = () => {
        navigate("/dailytest/result", {replace: true});
    };

    return (
        <>
            <Instruction>{instruction}</Instruction>
            <QuestionWord>{question.prompt}</QuestionWord>

            <AnswerInput
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                disabled={!!feedback}
            />

            {feedback && (
                <>
                    <Feedback $correct={feedback.correct}>
                        Correct answer: <strong>{feedback.correctAnswer}</strong>
                    </Feedback>
                </>
            )}


            {error && <ErrorMessage>{error}</ErrorMessage>}

            {!feedback ? (
                <Button onClick={handleCheck} disabled={loading}>
                    Check
                </Button>
            ) : !isLast ? (
                <Button onClick={handleNext}>Next</Button>
            ) : (
                <Button onClick={handleFinish}>Finish</Button>
            )}
        </>
    );
}
