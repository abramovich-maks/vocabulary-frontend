import {useEffect, useState} from "react";
import {deleteWord, getAllWords, updateWord} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import {WordItem} from "./WordItem";
import type {WordDto} from "../../models/models";

export default function WordListPage() {
    const {isAuthenticated} = useAuth();

    const [words, setWords] = useState<WordDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);

    const loadWords = async () => {
        try {
            const res = await getAllWords();
            setWords(res.data.dtoResponse);
        } catch {
            setError("Failed to load words");
        }
    };

    useEffect(() => {
        if (isAuthenticated) loadWords();
    }, [isAuthenticated]);

    const handleDelete = async (id: number) => {
        await deleteWord(id);
        loadWords();
        setOpenId(null);
    };

    const handleUpdate = async (id: number, word: string, translate: string) => {
        await updateWord(id, {word, translate});
        loadWords();
    };

    if (error) return <p>{error}</p>;

    return (
        <>
            <h2>My Dictionary</h2>

            {words.length === 0 && <p>No words yet</p>}

            {words.map(word => (
                <WordItem
                    key={word.id}
                    word={word}
                    isOpen={openId === word.id}
                    onToggle={setOpenId}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
        </>
    );
}
