import {useEffect, useState} from "react";
import {deleteWord, getAllWords, updateWord} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import type {WordDto} from "../../models/models";
import {
    PageButton,
    PageContent,
    PageInfo,
    PaginationRow,
    SearchContainer,
    SearchInput,
    Table,
    TableContainer
} from "./WordList.styles"
import {WordRow} from "./WordRow"
import WordEditForm from "./WordEditForm"

export default function WordListPage() {
    const {isAuthenticated} = useAuth();

    const [words, setWords] = useState<WordDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [editingWord, setEditingWord] = useState<WordDto | null>(null);
    const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);

    const loadWords = async (pageNumber = 0) => {
        try {
            const res = await getAllWords(pageNumber);

            setWords(res.data.content);
            setPage(res.data.number);
            setTotalPages(res.data.totalPages);

        } catch {
            setError("Failed to load words");
        }
    };

    useEffect(() => {
        if (isAuthenticated) loadWords();
    }, [isAuthenticated]);

    const handleDelete = async (id: number) => {
        await deleteWord(id);
        loadWords(page);
    };

    const handleUpdate = async (id: number, word: string, translate: string) => {
        await updateWord(id, {word, translate});
        loadWords(page);
    };

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
            <h2>My Dictionary</h2>

            {words.length === 0 ? (
                <p>No words yet</p>
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

            <PaginationRow>
                <PageButton
                    disabled={page === 0}
                    onClick={() => loadWords(page - 1)}
                >
                    Prev
                </PageButton>

                <PageInfo>
                    Page {page + 1} / {totalPages}
                </PageInfo>

                <PageButton
                    disabled={page + 1 >= totalPages}
                    onClick={() => loadWords(page + 1)}
                >
                    Next
                </PageButton>
            </PaginationRow>

        </PageContent>
    );
}