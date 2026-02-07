import { useState } from "react";
import { Field, FormAddedWord, StyledCard } from "../AddWord/AddWord.styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ErrorMessage } from "../../components/ErrorMessage";

interface Props {
    groupId: number;
    groupName: string;
    onSubmit: (word: string) => void;
    loading?: boolean;
    error?: string | null;
    onCancel?: () => void;
}

export default function AddWordToGroupForm({
                                               groupId,
                                               groupName,
                                               onSubmit,
                                               loading,
                                               error,
                                               onCancel
                                           }: Props) {

    const [word, setWord] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (submitting) return;

        try {
            setSubmitting(true);
            await onSubmit(word);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormAddedWord onSubmit={handleSubmit}>
            <StyledCard>
                <h2>Add new word</h2>

                <Field>
                    <label>Group</label>
                    <div style={{ fontWeight: "bold" }}>
                        {groupName}
                    </div>
                </Field>

                <Field>
                    <label>English word</label>
                    <Input
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </Field>

                <Button type="submit" disabled={loading || submitting}>
                    {(loading || submitting) ? "Adding..." : "Add word"}
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
