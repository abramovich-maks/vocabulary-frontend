import {useEffect, useState} from "react";
import {deleteWord, getAllWords} from "./dictionaryApi";
import type {WordDto} from "./dictionaryTypes";
import {useAuth} from "../auth/AuthContext";
import AddWordForm from "./AddWordForm";

export default function WordListPage() {
    const [words, setWords] = useState<WordDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {logout} = useAuth();
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const loadWords = () => {
        getAllWords()
            .then((res) => setWords(res.data.dtoResponse))
            .catch(() => setError("Failed to load words"));
    };

    const handleDelete = async (id: number) => {
        try {
            setLoadingId(id);
            await deleteWord(id);
            loadWords();
        } catch {
            setError("Failed to delete word");
        } finally {
            setLoadingId(null);
        }
    };

    useEffect(() => {
        loadWords();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <h2>My Dictionary</h2>
            <AddWordForm onWordAdded={loadWords}/>
            {words.length === 0 && <p>No words yet</p>}

            <ul>
                {words.map(word => (
                    <li key={word.id}>
                        <strong>{word.word}</strong> — {word.translate}

                        <button
                            style={{marginLeft: 10}}
                            onClick={() => handleDelete(word.id)}
                            disabled={loadingId === word.id}
                        >
                            {loadingId === word.id ? "Deleting..." : "Delete"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
