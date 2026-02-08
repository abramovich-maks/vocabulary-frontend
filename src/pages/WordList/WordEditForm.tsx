import {useState} from "react";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {WordDto} from "../../models/models";
import {ModalCard, ModalOverlay} from "./WordList.styles";

interface Props {
    word: WordDto;
    onSave: (word: string, translate: string) => Promise<void>;
    onClose: () => void;
}

export default function WordEditForm({word, onSave, onClose}: Props) {

    const [editWord, setEditWord] = useState(word.word);
    const [editTranslate, setEditTranslate] = useState(word.translate);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            await onSave(editWord, editTranslate);
            onClose();
        } catch {
            setError("Failed to update word");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <h3>Edit Word</h3>

                <div style={{marginBottom: '12px'}}>
                    <Input
                        placeholder="Word"
                        value={editWord}
                        onChange={e => setEditWord(e.target.value)}
                    />
                </div>

                <div style={{marginBottom: '16px'}}>
                    <Input
                        placeholder="Translation"
                        value={editTranslate}
                        onChange={e => setEditTranslate(e.target.value)}
                    />
                </div>

                <div style={{display: "flex", gap: 10}}>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>

                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                </div>

                {error && <ErrorMessage style={{marginTop: '12px'}}>{error}</ErrorMessage>}
            </ModalCard>
        </ModalOverlay>
    );
}