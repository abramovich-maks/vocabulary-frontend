import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteWord, deleteWordFromGroup, getGroupById, updateWord} from "../../composables/dictionaryApi";
import type {WordDto} from "../../models/models";
import {GroupWordRow} from "./GroupWordRow";
import {Button} from "../../components/Button";
import {PageContent, SearchContainer, SearchInput, Table, TableContainer} from "./Groups.styles";

export default function GroupWordsPage() {
    const {groupId} = useParams();
    const navigate = useNavigate();

    const [words, setWords] = useState<WordDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const loadWords = async () => {
        try {
            const res = await getGroupById(Number(groupId));
            setWords(res.data.words);
            setGroupName(res.data.groupName);
        } catch {
            setError("Failed to load group words");
        }
    };

    const handleRemoveFromGroup = async (wordId: number) => {
        try {
            await deleteWordFromGroup(Number(groupId), wordId);
            await loadWords();
        } catch {
            setError("Failed to remove word from group");
        }
    };

    const handleDelete = async (wordId: number) => {
        try {
            await deleteWord(wordId);
            await loadWords();
        } catch {
            setError("Failed to delete word");
        }
    };

    const handleUpdate = async (id: number, word: string, translate: string) => {
        try {
            await updateWord(id, {word, translate});
            await loadWords();
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (groupId) {
            loadWords();
        }
    }, [groupId]);

    // Filter words based on search query
    const filteredWords = words.filter(word => {
        const query = searchQuery.toLowerCase();
        return (
            word.word.toLowerCase().includes(query) ||
            word.translate.toLowerCase().includes(query)
        );
    });

    if (error) return <p>{error}</p>;

    return (
        <PageContent>
            <h2>{groupName}</h2>

            {words.length === 0 ? (
                <p>No words in this group</p>
            ) : (
                <>
                    <SearchContainer>
                        <SearchInput
                            type="text"
                            placeholder="Search words..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchContainer>

                    {filteredWords.length === 0 ? (
                        <p>No words found matching "{searchQuery}"</p>
                    ) : (
                        <TableContainer>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Word</th>
                                    <th>Translation</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {filteredWords.map(word => (
                                    <GroupWordRow
                                        key={word.id}
                                        word={word}
                                        onRemoveFromGroup={handleRemoveFromGroup}
                                        onDelete={handleDelete}
                                        onUpdate={handleUpdate}
                                        openDetailsId={openDetailsId}
                                        setOpenDetailsId={setOpenDetailsId}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                    />
                                ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}

            <Button onClick={() => navigate("/groups")} style={{marginTop: '1.5rem'}}>
                Back to Groups
            </Button>
        </PageContent>
    );
}