import {useEffect, useState} from "react";
import {getDetailsWord} from "../../composables/dictionaryApi";
import type {WordDetails as WordDetailsType} from "../../models/models";

interface Props {
    wordId: number;
}

export const WordDetails = ({wordId}: Props) => {
    const [details, setDetails] = useState<WordDetailsType | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await getDetailsWord(wordId);
                setDetails(res.data ?? null);
            } catch {
                setDetails(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [wordId]);

    if (loading) return <p>Loading details...</p>;
    if (!details) return <p>No details available.</p>;

    return (
        <div>
            <h3>{details.word}</h3>
            {details.phonetic && <p>Phonetic: {details.phonetic}</p>}
            {details.audioUrl && <audio controls src={details.audioUrl}/>}
            <p>{details.definition}</p>
        </div>
    );
};
