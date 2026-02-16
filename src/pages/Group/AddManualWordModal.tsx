import {useState} from "react";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {ErrorMessage} from "../../components/ErrorMessage";
import {ModalCard, ModalOverlay} from "./Groups.styles";

interface Props {
    groupName: string;
    initialWord: string;
    onSubmit: (word: string, translate: string) => Promise<void>;
    onClose: () => void;
}

export default function AddManualWordModal({groupName, initialWord, onSubmit, onClose}: Props) {
    const [word, setWord] = useState(initialWord);
    const [translate, setTranslate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
        setError(null);
    };

    const handleTranslateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTranslate(e.target.value);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!word.trim() || !translate.trim()) return;

        try {
            setLoading(true);
            setError(null);
            await onSubmit(word.trim(), translate.trim());
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add word");
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
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <h3>Add Word Manually</h3>

                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '12px'}}>
                        <label style={{display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                            Group: <strong>{groupName}</strong>
                        </label>
                    </div>

                    <div style={{marginBottom: '12px'}}>
                        <Input
                            placeholder="Word"
                            value={word}
                            onChange={handleWordChange}
                            autoFocus
                        />
                    </div>

                    <div style={{marginBottom: '16px'}}>
                        <Input
                            placeholder="Translation"
                            value={translate}
                            onChange={handleTranslateChange}
                        />
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button type="submit" disabled={loading || !word.trim() || !translate.trim()}>
                            {loading ? "Adding..." : "Add Word"}
                        </Button>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>

                    {error && <ErrorMessage style={{marginTop: '12px'}}>{error}</ErrorMessage>}
                </form>
            </ModalCard>
        </ModalOverlay>
    );
}