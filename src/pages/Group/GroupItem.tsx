import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import type {GroupResponse, WordDto} from '../../models/models';
import {ActionsRow, ButtonRow, EditForm, GroupCard, GroupHeader} from "./Groups.styles";
import {ErrorMessage} from "../../components/ErrorMessage";
import {
    addWord,
    addWordAutoTranslate,
    addWordsToGroup,
    addWordToGroup,
    getAvailableWords
} from "../../composables/dictionaryApi";


import AddWordToGroupForm from "./AddWordToGroupForm";
import AddExistingWordToGroupForm from "./AddExistingWordToGroupForm";
import AddManualWordToGroupForm from "./AddManualWordToGroupForm";


interface Props {
    group: GroupResponse;
    isOpen: boolean;
    onToggle: (id: number | null) => void;
    onDelete: (id: number) => Promise<void>;
    onDeleteWord: (groupId: number, wordId: number) => Promise<void>;
    onUpdate: (id: number, groupName: string) => Promise<void>;
    onRefreshGroups: () => Promise<void>;
}

export function GroupItem({group, isOpen, onToggle, onDelete, onUpdate, onRefreshGroups, onDeleteWord}: Props) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(group.groupName);
    const [error, setError] = useState<string | null>(null);
    const [words, setWords] = useState<WordDto[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [mode, setMode] = useState<"none" | "new" | "existing" | "manual">("none");
    const [currentWord, setCurrentWord] = useState("");


    const navigate = useNavigate();

    const handleSave = async () => {
        setError(null);
        if (editedName.trim() && editedName !== group.groupName) {
            try {
                await onUpdate(group.groupId, editedName.trim());
                setIsEditing(false);
            } catch (e: any) {
                setError(e?.response?.data?.message || "Failed to update group");
            }
        }
    };

    const toggleCard = () => {
        if (isEditing || mode !== "none") return;
        onToggle(isOpen ? null : group.groupId);
    };

    const handleCancelEdit = () => {
        setEditedName(group.groupName);
        setIsEditing(false);
        setError(null);
    };

    const handleCancelForm = () => {
        setError(null);
        setMode("none");
    };

    const loadAvailableWords = async () => {
        const res = await getAvailableWords(group.groupId);
        setWords(res.data.words);
    };

    const toggleWord = (id: number) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(w => w !== id)
                : [...prev, id]
        );
    };
    const handleAddExisting = async () => {
        try {
            await addWordsToGroup(group.groupId, selected);
            setSelected([]);
            setWords([]);
            setError(null);
            await onRefreshGroups();
            setMode("none");

        } catch {
            setError("Failed to add words");
        }
    };
    const handleCreateWord = async (word: string) => {
        if (!word.trim()) return;

        try {
            setError(null);
            setCurrentWord(word);

            const response = await addWordAutoTranslate({word});
            const createdWord = response.data;

            await addWordToGroup(group.groupId, createdWord.id);
            await onRefreshGroups();
            setMode("none");
        } catch (err: any) {

            if (err?.response?.data?.message?.includes("Unknown word")) {
                setError(err.response.data.message);
                setMode("manual");
                return;
            }


            setError(
                err?.response?.data?.message || "Failed to create word"
            );
        }
    };

    const handleManualCreate = async (word: string, translate: string) => {
        try {
            setError(null);

            const response = await addWord({word, translate});
            const createdWord = response.data;

            await addWordToGroup(group.groupId, createdWord.id);
            await onRefreshGroups();
            setMode("none");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add word");
        }
    };


    return (
        <GroupCard>

            <GroupHeader
                onClick={toggleCard}
                style={{opacity: isEditing || mode !== "none" ? 0.5 : 1}}
            >
                {group.groupName}
                <span style={{marginLeft: 20, color: "#888", fontSize: 14}}>
                    {group.countWord} words
                </span>
            </GroupHeader>

            {isOpen && (
                <>
                    {isEditing ? (
                        <EditForm>
                            <Input
                                value={editedName}
                                onChange={e => setEditedName(e.target.value)}
                            />
                            <ButtonRow>
                                <Button onClick={handleSave}>Save</Button>
                                <Button onClick={handleCancelEdit}>Cancel</Button>
                            </ButtonRow>
                            {error && <ErrorMessage>{error}</ErrorMessage>}
                        </EditForm>

                    ) : mode === "manual" ? (
                        <AddManualWordToGroupForm
                            groupName={group.groupName}
                            initialWord={currentWord}
                            onSubmit={handleManualCreate}
                            onCancel={() => {
                                setError(null);
                                setMode("new");
                            }}
                            error={error}
                        />

                    ) : mode === "new" ? (
                        <AddWordToGroupForm
                            groupId={group.groupId}
                            groupName={group.groupName}
                            onSubmit={handleCreateWord}
                            onCancel={handleCancelForm}
                            error={error}

                        />

                    ) : mode === "existing" ? (
                        <AddExistingWordToGroupForm
                            groupName={group.groupName}
                            words={words}
                            selected={selected}
                            onToggleWord={toggleWord}
                            onSubmit={handleAddExisting}
                            onCancel={() => setMode("none")}
                            error={error}

                        />


                    ) : (
                        <ActionsRow>
                            <Button onClick={() => navigate(`/groups/${group.groupId}`)}>
                                Show words
                            </Button>

                            <Button onClick={async () => {
                                setError(null);
                                await loadAvailableWords();
                                setMode("existing");
                            }}>

                                Add existing words
                            </Button>


                            <Button onClick={() => {
                                setError(null);
                                setMode("new");
                            }}>
                                Add new word
                            </Button>

                            <Button onClick={() => setIsEditing(true)}>
                                Edit group name
                            </Button>
                            {/*<Button onClick={() => onDeleteWord(word.id)}>*/}
                            {/*    Delete from group*/}
                            {/*</Button>*/}
                            <Button onClick={() => onDelete(group.groupId)}>
                                Delete group
                            </Button>
                        </ActionsRow>
                    )}
                </>
            )}
        </GroupCard>
    );
}
