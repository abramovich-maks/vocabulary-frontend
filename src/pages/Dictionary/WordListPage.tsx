import {useEffect, useState} from "react";
import {deleteWord, getAllWords, getDetailsWord, updateWord} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import AddWordForm from "./AddWordForm";

import type {
    WordDto
} from '../../models/models';

export default function WordListPage() {
    const [words, setWords] = useState<WordDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {logout, isAuthenticated} = useAuth();
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editWord, setEditWord] = useState("");
    const [editTranslate, setEditTranslate] = useState("");
    const [selectedDetails, setSelectedDetails] = useState<WordDetails | null>(null);


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
        if (isAuthenticated) {
            loadWords();
        }
    }, [isAuthenticated]);

    const startEdit = (word: WordDto) => {
        setEditingId(word.id);
        setEditWord(word.word);
        setEditTranslate(word.translate);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditWord("");
        setEditTranslate("");
    };

    const saveEdit = async (id: number) => {
        try {
            setLoadingId(id);
            await updateWord(id, {
                word: editWord,
                translate: editTranslate,
            });
            cancelEdit();
            loadWords();
        } catch {
            setError("Failed to update word");
        } finally {
            setLoadingId(null);
        }
    };

    const handleDetails = async (id: number) => {
        try {
            const res = await getDetailsWord(id);
            setSelectedDetails(res.data);
        } catch {
            setError("Failed to load word details");
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div>
            <button onClick={logout}>Logout</button>
            <h2>My Dictionary</h2>
            <AddWordForm onWordAdded={loadWords}/>
            {words.length === 0 && <p>No words yet</p>}
            {selectedDetails && (
                <div style={{border: "1px solid #ccc", padding: "10px", marginTop: "20px"}}>
                    <h3>{selectedDetails.word}</h3>
                    {selectedDetails.phonetic && (
                        <p><strong>Phonetic:</strong> {selectedDetails.phonetic}</p>
                    )}
                    {selectedDetails.audioUrl && (
                        <audio controls src={selectedDetails.audioUrl}/>
                    )}
                    <p><strong>Definition:</strong> {selectedDetails.definition}</p>
                    {selectedDetails.example && (
                        <p><strong>Example:</strong> {selectedDetails.example}</p>
                    )}
                    <button onClick={() => setSelectedDetails(null)}>Close</button>
                </div>
            )}
            <ul>
                {words.map(word => (
                    <li key={word.id}>
                        {editingId === word.id ? (
                            <>
                                <input
                                    value={editWord}
                                    onChange={e => setEditWord(e.target.value)}
                                />
                                <input
                                    value={editTranslate}
                                    onChange={e => setEditTranslate(e.target.value)}
                                />

                                <button onClick={() => saveEdit(word.id)}>
                                    {loadingId === word.id ? "Saving..." : "Save"}
                                </button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <strong>{word.word}</strong> — {word.translate}

                                <button onClick={() => handleDetails(word.id)}>
                                    Details
                                </button>

                                <button onClick={() => startEdit(word)}>
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(word.id)}
                                    disabled={loadingId === word.id}
                                >
                                    {loadingId === word.id ? "Deleting..." : "Delete"}
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}