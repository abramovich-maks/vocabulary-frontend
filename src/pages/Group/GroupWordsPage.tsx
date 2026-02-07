import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteWord, deleteWordFromGroup, getGroupById, updateWord} from "../../composables/dictionaryApi";
import type {WordDto} from "../../models/models";
import {WordGroupItem} from "../Group/WordGroupItem";
import {Button} from "../../components/Button";

export default function GroupWordsPage() {

    const {groupId} = useParams();
    const navigate = useNavigate();

    const [words, setWords] = useState<WordDto[]>([]);
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);


    const loadWords = async () => {
        try {
            const res = await getGroupById(Number(groupId));
            setWords(res.data.words);
            setGroupName(res.data.groupName);
        } catch {
            setError("Failed to load group words");
        }
    };
    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteWord(id);
            setOpenId(null);
            await loadWords();
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromGroup = async (wordId: number) => {
        try {
            setLoading(true);
            await deleteWordFromGroup(Number(groupId), wordId);
            await loadWords();
        } catch {
            setError("Failed to remove word from group");
        } finally {
            setLoading(false);
        }
    };



    const handleUpdate = async (id: number, word: string, translate: string) => {
        await updateWord(id, {word, translate});
        await loadWords();
    };

    useEffect(() => {
        if (groupId) {
            loadWords();
        }
    }, [groupId]);

    if (error) return <p>{error}</p>;

    return (
        <>
            <h2>{groupName}</h2>

            {words.length === 0 && (
                <>
                    <p>No words in this group</p>
                </>
            )}

            {words.map(word => (
                <WordGroupItem
                    key={word.id}
                    groupId={groupId}
                    word={word}
                    isOpen={openId === word.id}
                    onToggle={setOpenId}
                    onRemoveFromGroup={handleRemoveFromGroup}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}

            <Button onClick={() => navigate("/groups")}>
                Back to groups
            </Button>
        </>
    );
}
