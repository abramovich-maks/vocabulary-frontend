import {useEffect, useState} from "react";
import {useAuth} from "../../composables/AuthContext";
import {getIrregularVerbs} from "../../composables/irregularVerbsApi";
import type {IrregularVerbDto} from "../../models/models";
import {
    ErrorText,
    LoadingText,
    PageContent,
    SearchContainer,
    SearchInput,
    Table,
    TableContainer,
    Transcription,
    VerbCell,
    VerbForm
} from "./IrregularVerb.styles";

export default function IrregularVerbsPage() {
    const {isAuthenticated} = useAuth();
    const [verbs, setVerbs] = useState<IrregularVerbDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadVerbs = async () => {
        try {
            setLoading(true);
            const response = await getIrregularVerbs();
            setVerbs(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to load irregular verbs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadVerbs();
        }
    }, [isAuthenticated]);

    const filteredVerbs = verbs.filter(verb => {
        const query = searchQuery.toLowerCase();
        return (
            verb.baseForm.toLowerCase().includes(query) ||
            verb.pastSimple.toLowerCase().includes(query) ||
            verb.pastParticiple.toLowerCase().includes(query)
        );
    });

    if (loading) {
        return (
            <PageContent>
                <h2>Irregular Verbs</h2>
                <LoadingText>Loading verbs...</LoadingText>
            </PageContent>
        );
    }

    if (error) {
        return (
            <PageContent>
                <h2>Irregular Verbs</h2>
                <ErrorText>{error}</ErrorText>
            </PageContent>
        );
    }

    return (
        <PageContent>
            <h2>Irregular Verbs</h2>

            {verbs.length === 0 ? (
                <p>No verbs available</p>
            ) : (
                <>
                    <SearchContainer>
                        <SearchInput
                            type="text"
                            placeholder="Search verbs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchContainer>

                    {filteredVerbs.length === 0 ? (
                        <p>No verbs found matching "{searchQuery}"</p>
                    ) : (
                        <TableContainer>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Base Form</th>
                                    <th>Past Simple</th>
                                    <th>Past Participle</th>
                                    <th>Translation</th>
                                </tr>
                                </thead>

                                <tbody>
                                {filteredVerbs.map((verb, index) => (
                                    <tr key={index}>
                                        <td>
                                            <VerbCell>
                                                <VerbForm>{verb.baseForm}</VerbForm>
                                                {verb.baseTranscription && (
                                                    <Transcription>{verb.baseTranscription}</Transcription>
                                                )}
                                            </VerbCell>
                                        </td>

                                        <td>
                                            <VerbCell>
                                                <VerbForm>{verb.pastSimple}</VerbForm>
                                                {verb.pastTranscription && (
                                                    <Transcription>{verb.pastTranscription}</Transcription>
                                                )}
                                            </VerbCell>
                                        </td>

                                        <td>
                                            <VerbCell>
                                                <VerbForm>{verb.pastParticiple}</VerbForm>
                                                {verb.pastParticipleTranscription && (
                                                    <Transcription>{verb.pastParticipleTranscription}</Transcription>
                                                )}
                                            </VerbCell>
                                        </td>

                                        <td>{verb.translation}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
        </PageContent>
    );
}