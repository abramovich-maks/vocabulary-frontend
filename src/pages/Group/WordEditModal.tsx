import {useState} from "react";
import axios from "axios";

import {Field, FormAddedWord, StyledCard} from "../AddWord/AddWord.styles";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {WordDto} from "../../models/models";
import {ModalOverlay} from "./Groups.styles";

interface Props {
    word: WordDto;
    onSave: (word: string, translate: string) => Promise<void>;
    onClose: () => void;
}

export default function WordEditModal({word, onSave, onClose}: Props) {
    const [editWord, setEditWord] = useState(word.word);
    const [editTranslate, setEditTranslate] = useState(word.translate);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditWord(e.target.value);
        setError(null);
    };

    const handleTranslateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTranslate(e.target.value);
        setError(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editWord.trim() || !editTranslate.trim()) return;

        try {
            setLoading(true);
            setError(null);
            await onSave(editWord.trim(), editTranslate.trim());
            onClose();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? "Failed to update word");
            } else {
                setError("Failed to update word");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
        onClose();
    };

    return (
        <ModalOverlay onClick={handleClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <FormAddedWord onSubmit={handleSave}>
                    <StyledCard>
                        <h2>Edit word</h2>

                        <Field>
                            <label>Word</label>
                            <Input
                                value={editWord}
                                onChange={handleWordChange}
                                autoFocus
                            />
                        </Field>

                        <Field>
                            <label>Translation</label>
                            <Input
                                value={editTranslate}
                                onChange={handleTranslateChange}
                            />
                        </Field>

                        <Button type="submit" disabled={loading || !editWord.trim() || !editTranslate.trim()}>
                            {loading ? "Saving..." : "Save"}
                        </Button>

                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>

                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </StyledCard>
                </FormAddedWord>
            </div>
        </ModalOverlay>
    );
}