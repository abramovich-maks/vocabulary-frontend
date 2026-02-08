import {useEffect, useState} from "react";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {WordDto} from "../../models/models";
import {ActionsButton, DetailsCell, DropdownMenu} from "./WordList.styles";
import {WordDetails} from "./WordDetails";

interface Props {
    word: WordDto;
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, word: string, translate: string) => Promise<void>;
    openMenuId: number | null;
    setOpenMenuId: (id: number | null) => void;
    onEdit: (word: WordDto) => void;
    openDetailsId: number | null;
    setOpenDetailsId: (id: number | null) => void;

}

export const WordRow = ({
                            word,
                            onDelete,
                            openMenuId,
                            setOpenMenuId,
                            onEdit,
                            openDetailsId,
                            setOpenDetailsId
                        }: Props) => {

    const [error, setError] = useState<string | null>(null);
    const menuOpen = openMenuId === word.id;
    const detailsOpen = openDetailsId === word.id;


    useEffect(() => {
        const close = () => setOpenMenuId(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    const handleDelete = async () => {
        try {
            await onDelete(word.id);
        } catch {
            setError("Failed to delete word");
        }
    };

    return (
        <>
            <tr onClick={() => {
                setOpenMenuId(null);
                setOpenDetailsId(detailsOpen ? null : word.id);
            }}
            >

                <td>{word.word}</td>
                <td>{word.translate}</td>

                <td>
                    <div style={{position: "relative", display: "inline-block"}}>
                        <ActionsButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(menuOpen ? null : word.id);
                            }}
                        >
                            ⋮
                        </ActionsButton>

                        {menuOpen && (
                            <DropdownMenu onClick={e => e.stopPropagation()}>
                                <div onClick={() => {
                                    onEdit(word);
                                    setOpenMenuId(null);
                                }}>
                                    Edit
                                </div>

                                <div onClick={() => {
                                    handleDelete();
                                    setOpenMenuId(null);
                                }}>
                                    Delete
                                </div>
                            </DropdownMenu>
                        )}
                    </div>
                </td>

            </tr>

            {detailsOpen && (
                <tr>
                    <DetailsCell colSpan={3}>
                        <WordDetails wordId={word.id}/>
                    </DetailsCell>
                </tr>
            )}

            {error && (
                <tr>
                    <td colSpan={3}>
                        <ErrorMessage>{error}</ErrorMessage>
                    </td>
                </tr>
            )}
        </>
    );
};