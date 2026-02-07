import { useState } from "react";
import { Field, FormAddedWord, StyledCard } from "../AddWord/AddWord.styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ErrorMessage } from "../../components/ErrorMessage";
import GroupSelector from "./GroupSelector";

interface Props {
    groupName: string;
    initialWord: string;
    onSubmit: (word: string, translate: string) => void;
    loading?: boolean;
    error?: string | null;
    onCancel?: () => void;
}

export default function AddManualWordToGroupForm({
                                                     groupName,
                                                     initialWord,
                                                     onSubmit,
                                                     loading,
                                                     error,
                                                     onCancel
                                                 }: Props) {

    const [word, setWord] = useState(initialWord);
    const [translate, setTranslate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(word, translate);
    };

    return (
        <FormAddedWord onSubmit={handleSubmit}>
            <StyledCard>

                <h2>Add word manually</h2>

                <Field>
                    <label>Group</label>
                    <div style={{ fontWeight: "bold" }}>{groupName}</div>
                </Field>

                <Field>
                    <label>Word</label>
                    <Input
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </Field>

                <Field>
                    <label>Translate</label>
                    <Input
                        value={translate}
                        onChange={e => setTranslate(e.target.value)}
                    />
                </Field>

                <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add word"}
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
