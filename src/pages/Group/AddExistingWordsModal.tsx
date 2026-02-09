import {useState} from "react";
import {Button} from "../../components/Button";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {WordDto} from "../../models/models";
import {ModalCard, ModalOverlay} from "./Groups.styles";

interface Props {
    groupName: string;
    availableWords: WordDto[];
    onSubmit: (selectedIds: number[]) => Promise<void>;
    onClose: () => void;
}

export default function AddExistingWordsModal({groupName, availableWords, onSubmit, onClose}: Props) {
    const [selected, setSelected] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleWord = (id: number) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(w => w !== id)
                : [...prev, id]
        );
        setError(null); // Сбрасываем ошибку при выборе
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selected.length === 0) return;

        try {
            setLoading(true);
            setError(null);
            await onSubmit(selected);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add words");
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
            <ModalCard onClick={(e) => e.stopPropagation()} style={{maxWidth: '500px', maxHeight: '80vh', overflow: 'auto'}}>
                <h3>Add Existing Words</h3>

                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '12px'}}>
                        <label style={{display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                            Group: <strong>{groupName}</strong>
                        </label>
                    </div>

                    <div style={{marginBottom: '12px'}}>
                        <strong>Available words:</strong>
                    </div>

                    {availableWords.length === 0 ? (
                        <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>No available words</p>
                    ) : (
                        <div style={{
                            marginBottom: '16px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '12px'
                        }}>
                            {availableWords.map(word => (
                                <div key={word.id} style={{marginBottom: '8px'}}>
                                    <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(word.id)}
                                            onChange={() => toggleWord(word.id)}
                                            style={{marginRight: '8px'}}
                                        />
                                        <span>{word.word} — {word.translate}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{marginBottom: '16px', textAlign: 'center', fontWeight: 'bold'}}>
                        Selected: {selected.length}
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button type="submit" disabled={loading || selected.length === 0}>
                            {loading ? "Adding..." : `Add ${selected.length} word${selected.length !== 1 ? 's' : ''}`}
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