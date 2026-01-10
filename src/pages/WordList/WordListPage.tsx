import {useEffect, useState} from "react";
import {deleteWord, getAllWords, updateWord} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import {WordItem} from "./WordItem";
import type {WordDto} from "../../models/models";
import {PageButton, PageInfo, PaginationRow} from "./WordList.styles"

export default function WordListPage() {
    const {isAuthenticated} = useAuth();

    const [words, setWords] = useState<WordDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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
        setOpenId(null);
    };

    const handleUpdate = async (id: number, word: string, translate: string) => {
        await updateWord(id, {word, translate});
        loadWords(page);
    };

    if (error) return <p>{error}</p>;

    return (
        <>
            <h2>My Dictionary</h2>

            {words.length === 0 && <p>No words yet</p>}

            {words.map(word => (
                <WordItem
                    key={word.id}
                    word={word}
                    isOpen={openId === word.id}
                    onToggle={setOpenId}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
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

        </>
    );
}
