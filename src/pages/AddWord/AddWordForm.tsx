import {useState} from "react";
import {Field, FormAddedWord, StyledCard} from "./AddWord.styles";
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {ErrorMessage} from '../../components/ErrorMessage';


interface Props {
    onSubmit: (word: string, translate: string) => void;
    loading?: boolean;
    error?: string | null;
}

export default function AddWordForm({onSubmit, loading, error}: Props) {
    const [word, setWord] = useState("");
    const [translate, setTranslate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(word, translate);
    };

    return (
        <FormAddedWord onSubmit={handleSubmit}>
            <StyledCard>
                <h2>Add new word</h2>

                <Field>
                    <label>Word</label>
                    <Input
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </Field>

                <Field>
                    <label>Translation</label>
                    <Input
                        value={translate}
                        onChange={e => setTranslate(e.target.value)}
                    />
                </Field>

                <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add word"}
                </Button>

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </StyledCard>
        </FormAddedWord>
    );
}
