import { useEffect, useState } from "react";
import { getAllWords } from "./dictionaryApi";
import type { WordDto } from "./dictionaryTypes";

export default function WordListPage() {
    const [words, setWords] = useState<WordDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllWords()
            .then(res => {
                setWords(res.data.dtoResponse);
            })
            .catch(() => setError("Failed to load words"));
    }, []);




    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>My Dictionary</h2>

            {words.length === 0 && <p>No words yet</p>}

            <ul>
                {words.map(word => (
                    <li key={word.id}>
                        <strong>{word.word}</strong> — {word.translate}
                    </li>
                ))}
            </ul>
        </div>
    );
}
