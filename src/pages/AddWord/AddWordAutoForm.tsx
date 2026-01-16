import {useState} from "react";
import {Field, FormAddedWord, StyledCard} from "./AddWord.styles";
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {ErrorMessage} from '../../components/ErrorMessage';

interface Props {
    onSubmit: (word: string) => void;
    onSwitchToManual: () => void;
    loading?: boolean;
    error?: string | null;
    showManualOption?: boolean;
}


export default function AddWordAutoForm({onSubmit, onSwitchToManual, loading, error, showManualOption}: Props) {
    const [word, setWord] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(word);
    };

    return (
        <FormAddedWord onSubmit={handleSubmit}>
            <StyledCard>
                <h2>Add new word</h2>

                <Field>
                    <label>English word</label>
                    <Input
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                </Field>
                <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add word"}
                </Button>

                {error && (
                    <>
                        <ErrorMessage>{error}</ErrorMessage>
                        {showManualOption && (
                            <Button
                                type="button"
                                onClick={onSwitchToManual}>
                                Add manually
                            </Button>
                        )}
                    </>
                )}
            </StyledCard>
        </FormAddedWord>
    );
}
