import {useState} from "react";
import {Field, FormAddedWord, StyledCard} from "../AddWord/AddWord.styles";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {ErrorMessage} from "../../components/ErrorMessage";
import {ModalOverlay} from "./Groups.styles";

interface Props {
    groupName: string;
    onSubmit: (word: string, translate?: string) => Promise<void>;
    onClose: () => void;
}

export default function AddWordToGroupModal({groupName, onSubmit, onClose}: Props) {
    const [word, setWord] = useState("");
    const [translate, setTranslate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showManualForm, setShowManualForm] = useState(false);
    const [currentWord, setCurrentWord] = useState("");

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
        setError(null);
    };

    const handleTranslateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTranslate(e.target.value);
        setError(null);
    };

    const handleAutoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!word.trim()) return;

        try {
            setLoading(true);
            setError(null);
            setCurrentWord(word.trim());
            await onSubmit(word.trim());
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add word");
        } finally {
            setLoading(false);
        }
    };

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!word.trim() || !translate.trim()) return;

        try {
            setLoading(true);
            setError(null);
            await onSubmit(word.trim(), translate.trim());
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add word");
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchToManual = () => {
        setWord(currentWord);
        setShowManualForm(true);
        setError(null);
    };

    const handleBackToAuto = () => {
        setShowManualForm(false);
        setTranslate("");
        setError(null);
    };

    const handleClose = () => {
        setError(null);
        onClose();
    };

    const showManualOption = error?.includes("Unknown word") || error?.includes("Failed to add word");

    return (
        <ModalOverlay onClick={handleClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {!showManualForm ? (
                    <FormAddedWord onSubmit={handleAutoSubmit}>
                        <StyledCard>
                            <h2>Add new word</h2>

                            <Field>
                                <label>Group</label>
                                <div style={{fontWeight: "bold"}}>
                                    {groupName}
                                </div>
                            </Field>

                            <Field>
                                <label>English word</label>
                                <Input
                                    value={word}
                                    onChange={handleWordChange}
                                    autoFocus
                                />
                            </Field>

                            <Button type="submit" disabled={loading || !word.trim()}>
                                {loading ? "Adding..." : "Add word"}
                            </Button>

                            {error && (
                                <>
                                    <ErrorMessage>{error}</ErrorMessage>
                                    {showManualOption && (
                                        <Button
                                            type="button"
                                            onClick={handleSwitchToManual}
                                        >
                                            Add manually
                                        </Button>
                                    )}
                                </>
                            )}

                            <Button type="button" onClick={handleClose}>
                                Cancel
                            </Button>
                        </StyledCard>
                    </FormAddedWord>
                ) : (
                    <FormAddedWord onSubmit={handleManualSubmit}>
                        <StyledCard>
                            <h2>Add new word</h2>

                            <Field>
                                <label>Group</label>
                                <div style={{fontWeight: "bold"}}>
                                    {groupName}
                                </div>
                            </Field>

                            <Field>
                                <label>English word</label>
                                <Input
                                    value={word}
                                    onChange={handleWordChange}
                                    autoFocus
                                />
                            </Field>

                            <Field>
                                <label>Translation</label>
                                <Input
                                    value={translate}
                                    onChange={handleTranslateChange}
                                />
                            </Field>

                            <Button
                                type="button"
                                onClick={handleBackToAuto}
                                disabled={loading}
                            >
                                Back
                            </Button>

                            <Button type="submit" disabled={loading || !word.trim() || !translate.trim()}>
                                {loading ? "Adding..." : "Add word"}
                            </Button>

                            {error && <ErrorMessage>{error}</ErrorMessage>}
                        </StyledCard>
                    </FormAddedWord>
                )}
            </div>
        </ModalOverlay>
    );
}