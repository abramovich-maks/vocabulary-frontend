import { useState } from "react";
import { addWord } from "./dictionaryApi";

interface Props {
    onWordAdded: () => void;
}

export default function AddWordForm({ onWordAdded }: Props) {
    const [word, setWord] = useState("");
    const [translate, setTranslate] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!word || !translate) {
            setError("Both fields are required");
            return;
        }

        try {
            setLoading(true);
            await addWord({ word, translate });
            setWord("");
            setTranslate("");
            onWordAdded();
        } catch {
            setError("Failed to add word");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <h3>Add new word</h3>

            <input
                type="text"
                placeholder="Word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
            />

            <input
                type="text"
                placeholder="Translation"
                value={translate}
                onChange={(e) => setTranslate(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
