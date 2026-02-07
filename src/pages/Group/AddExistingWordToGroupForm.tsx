import { Field, FormAddedWord, StyledCard } from "../AddWord/AddWord.styles";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import type { WordDto } from "../../models/models";

interface Props {
    groupName: string;
    words: WordDto[];
    selected: number[];
    onToggleWord: (id: number) => void;
    onSubmit: () => void;
    loading?: boolean;
    error?: string | null;
    onCancel?: () => void;
}
export default function AddExistingWordToGroupForm({
                                                       groupName,
                                                       words,
                                                       selected,
                                                       onToggleWord,
                                                       onSubmit,
                                                       loading,
                                                       error,
                                                       onCancel
                                                   }: Props) {

    return (
        <FormAddedWord onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <StyledCard>

                <h2>Add existing words</h2>

                <Field>
                    <label>Group</label>
                    <div style={{ fontWeight: "bold" }}>
                        {groupName}
                    </div>
                </Field>

                <h3>Available words</h3>

                {words.length === 0 && <p>No available words</p>}

                {words.map(word => (
                    <div key={word.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selected.includes(word.id)}
                                onChange={() => onToggleWord(word.id)}
                            />
                            {word.word} — {word.translate}
                        </label>
                    </div>
                ))}

                <h3>Selected: {selected.length}</h3>

                <Button type="submit" disabled={selected.length === 0 || loading}>
                    Add selected words
                </Button>

                {onCancel && (
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}

            </StyledCard>
        </FormAddedWord>
    );
}
