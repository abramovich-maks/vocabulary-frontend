import {useState} from "react";
import {Field, FormAddedWord, StyledCard} from "./AddWord.styles";
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {ErrorMessage} from '../../components/ErrorMessage';
import GroupSelector from '../Group/GroupSelector';
import type {GroupDto} from '../../models/models';

interface Props {
    onSubmit: (word: string, groupId?: number) => void;
    onSwitchToManual: () => void;
    loading?: boolean;
    error?: string | null;
    showManualOption?: boolean;
    groups: GroupDto[];
    onCreateGroup: () => void;
    initialGroupId?: number;
}

export default function AddWordAutoForm({
                                            onSubmit,
                                            onSwitchToManual,
                                            loading,
                                            error,
                                            showManualOption,
                                            groups,
                                            onCreateGroup,
                                            initialGroupId
                                        }: Props) {
    const [word, setWord] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(initialGroupId ?? null);
    const [showGroupSelector, setShowGroupSelector] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(word, selectedGroupId ?? undefined);
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
                        autoFocus
                    />
                </Field>

                <Field>
                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                        <input
                            type="checkbox"
                            checked={showGroupSelector}
                            onChange={(e) => {
                                setShowGroupSelector(e.target.checked);
                                if (!e.target.checked) {
                                    setSelectedGroupId(null);
                                }
                            }}
                        />
                        Add to group (optional)
                    </div>
                </Field>

                {showGroupSelector && (
                    <GroupSelector
                        groups={groups}
                        selectedGroupId={selectedGroupId}
                        onSelectGroup={setSelectedGroupId}
                        onCreateGroup={onCreateGroup}
                    />
                )}
                <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add word"}
                </Button>

                {error && (
                    <>
                        <ErrorMessage>{error}</ErrorMessage>
                        {showManualOption && (
                            <Button
                                type="button"
                                onClick={onSwitchToManual}
                            >
                                Add manually
                            </Button>
                        )}
                    </>
                )}
            </StyledCard>
        </FormAddedWord>
    );
}