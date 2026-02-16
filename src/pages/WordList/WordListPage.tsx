import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteWord, getAllWords, updateWord} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import type {WordDto} from "../../models/models";
import {
    ActionButton,
    PageContent,
    SearchAndActionsBar,
    SearchInput,
    SortableHeader,
    SortIcon,
    Table,
    TableContainer
} from "./WordList.styles"
import {WordRow} from "./WordRow"
import WordEditForm from "./WordEditForm"

type SortField = 'word' | 'translate' | null;
type SortDirection = 'asc' | 'desc';

export default function WordListPage() {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const [words, setWords] = useState<WordDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [editingWord, setEditingWord] = useState<WordDto | null>(null);
    const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);

    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const loadWords = async () => {
        try {
            const res = await getAllWords();
            setWords(res.data.words);
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
    };

    const handleUpdate = async (id: number, word: string, translate: string) => {
        await updateWord(id, {word, translate});
        loadWords();
    };

    const handleSort = (field: 'word' | 'translate') => {
        if (sortField === field) {
            if (sortDirection === 'asc') {
                setSortDirection('desc');
            } else {
                setSortField(null);
                setSortDirection('asc');
            }
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredWords = words.filter(word => {
        const query = searchQuery.toLowerCase();
        return (
            word.word.toLowerCase().includes(query) ||
            word.translate.toLowerCase().includes(query)
        );
    });

    const sortedWords = [...filteredWords].sort((a, b) => {
        if (!sortField) return 0;

        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const getSortIcon = (field: 'word' | 'translate') => {
        if (sortField !== field) return '⇅';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    if (error) return <p>{error}</p>;

    return (
        <PageContent>
            <h2>My Dictionary</h2>

            {words.length === 0 ? (
                <p>No words yet</p>
            ) : (
                <>
                    <SearchAndActionsBar>
                        <SearchInput
                            type="text"
                            placeholder="Search words..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <ActionButton onClick={() => navigate('/words/add')}>
                            + Add new word
                        </ActionButton>
                    </SearchAndActionsBar>

                    {filteredWords.length === 0 ? (
                        <p>No words found matching "{searchQuery}"</p>
                    ) : (
                        <TableContainer>
                            <Table>
                                <thead>
                                <tr>
                                    <SortableHeader onClick={() => handleSort('word')}>
                                        Word
                                        <SortIcon $active={sortField === 'word'}>
                                            {getSortIcon('word')}
                                        </SortIcon>
                                    </SortableHeader>

                                    <SortableHeader onClick={() => handleSort('translate')}>
                                        Translation
                                        <SortIcon $active={sortField === 'translate'}>
                                            {getSortIcon('translate')}
                                        </SortIcon>
                                    </SortableHeader>

                                    <th>Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {sortedWords.map(word => (
                                    <WordRow
                                        key={word.id}
                                        word={word}
                                        onDelete={handleDelete}
                                        onUpdate={handleUpdate}
                                        onEdit={setEditingWord}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        openDetailsId={openDetailsId}
                                        setOpenDetailsId={setOpenDetailsId}
                                    />
                                ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}

            {editingWord && (
                <WordEditForm
                    word={editingWord}
                    onSave={async (wordText, translate) => {
                        await handleUpdate(editingWord.id, wordText, translate);
                    }}
                    onClose={() => setEditingWord(null)}
                />
            )}
        </PageContent>
    );
}