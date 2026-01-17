import {useEffect, useState} from "react";
import {getDetailsWord} from "../../composables/dictionaryApi";
import type {WordDetails as WordDetailsType} from "../../models/models";
import {
    AlternativeList,
    AudioPlayer,
    Content,
    DetailsContainer,
    DetailSection,
    Label,
    LoadingText,
    NoDataText
} from "./WordList.styles";

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

    if (loading) return <LoadingText>Loading details...</LoadingText>;
    if (!details) return <NoDataText>No details available.</NoDataText>;

    return (
        <DetailsContainer>
            {details.phonetic && (
                <DetailSection>
                    <Label>Phonetic</Label>
                    <Content>{details.phonetic}</Content>
                </DetailSection>
            )}

            {details.audioUrl && (
                <DetailSection>
                    <Label>Pronunciation</Label>
                    <AudioPlayer controls src={details.audioUrl}/>
                </DetailSection>
            )}

            {details.example && (
                <DetailSection>
                    <Label>Example</Label>
                    <Content>{details.example}</Content>
                </DetailSection>
            )}

            {details.alternativeTranslate && details.alternativeTranslate.length > 0 && (
                <DetailSection>
                    <Label>Alternative Translations</Label>
                    <AlternativeList>
                        {details.alternativeTranslate.map((alt, index) => (
                            <li key={index}>{alt}</li>
                        ))}
                    </AlternativeList>
                </DetailSection>
            )}
        </DetailsContainer>
    );
};