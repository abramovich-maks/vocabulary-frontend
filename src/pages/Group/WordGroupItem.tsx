import {useEffect, useState} from "react";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {ErrorMessage} from "../../components/ErrorMessage";
import {ActionsRow, EditFields, WordCard, WordHeader} from "../WordList/WordList.styles";
import {WordDetails} from "../WordList/WordDetails";
import type {WordDto} from "../../models/models";


interface Props {
    word: WordDto;
    isOpen: boolean;
    onToggle: (id: number | null) => void;
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, word: string, translate: string) => Promise<void>;
    groupId: number;
    onRemoveFromGroup: (wordId: number) => Promise<void>;

}

export const WordGroupItem = ({word, isOpen, onToggle, onDelete, onUpdate, onRemoveFromGroup}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editWord, setEditWord] = useState(word.word);
    const [editTranslate, setEditTranslate] = useState(word.translate);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const toggleCard = () => {
        if (isEditing) return;
        onToggle(isOpen ? null : word.id);
    };

    const handleSave = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            setLoading(true);
            setError(null);
            await onUpdate(word.id, editWord, editTranslate);
            setIsEditing(false);
        } catch {
            setError("Failed to update word");
        } finally {
            setLoading(false);
        }
    };

    const cancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditWord(word.word);
        setEditTranslate(word.translate);
        setIsEditing(false);
    };
    const deleteFromGroup = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            setLoading(true);
            await onRemoveFromGroup(word.id);
        } catch {
            setError("Failed to remove from group");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await onDelete(word.id);
    };

    const startEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
            setError(null);
        }
    }, [isOpen]);

    return (
        <WordCard>
            <WordHeader
                onClick={toggleCard}
                style={{opacity: isEditing ? 0.5 : 1}}
                title={isEditing ? "Finish editing first" : "Click to toggle"}
            > <strong>{word.word} </strong> - {word.translate}<span style={{marginLeft: 5}}>
        {isOpen ? "▴" : "▾"}
                <Button onClick={deleteFromGroup} disabled={loading}>Remove from group</Button>
    </span>
            </WordHeader>

            {isOpen && (
                <>
                    {!isEditing ? (
                        <>
                            <WordDetails wordId={word.id}/>

                            <ActionsRow>
                                <Button onClick={startEdit}>Edit</Button>
                                <Button onClick={handleDelete} disabled={loading}>
                                    Delete permanently
                                </Button>
                            </ActionsRow>
                        </>
                    ) : (
                        <>
                            <EditFields>
                                <Input
                                    value={editWord}
                                    onChange={e => setEditWord(e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                />

                                <Input
                                    value={editTranslate}
                                    onChange={e => setEditTranslate(e.target.value)}
                                    onClick={e => e.stopPropagation()}
                                />
                            </EditFields>

                            <ActionsRow>
                                <Button onClick={handleSave} disabled={loading}>
                                    {loading ? "Saving..." : "Save"}
                                </Button>
                                <Button onClick={cancelEdit}>Cancel</Button>
                            </ActionsRow>

                            {error && <ErrorMessage>{error}</ErrorMessage>}
                        </>
                    )}
                </>
            )}
        </WordCard>
    );
};
