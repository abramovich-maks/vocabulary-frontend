import {useEffect, useState} from "react";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {WordDto} from "../../models/models";
import {ActionsButton, DetailsCell, DropdownMenu} from "./Groups.styles";
import {WordDetails} from "../WordList/WordDetails";
import WordEditModal from "./WordEditModal";
import ConfirmModal from "../../components/ConfirmModal";

interface Props {
    word: WordDto;
    onRemoveFromGroup: (wordId: number) => Promise<void>;
    onDelete: (wordId: number) => Promise<void>;
    onUpdate: (id: number, word: string, translate: string) => Promise<void>;
    openDetailsId: number | null;
    setOpenDetailsId: (id: number | null) => void;
    openMenuId: number | null;
    setOpenMenuId: (id: number | null) => void;
}

export const GroupWordRow = ({
                                 word,
                                 onRemoveFromGroup,
                                 onDelete,
                                 onUpdate,
                                 openDetailsId,
                                 setOpenDetailsId,
                                 openMenuId,
                                 setOpenMenuId
                             }: Props) => {

    const [error, setError] = useState<string | null>(null);
    const [editingWord, setEditingWord] = useState<WordDto | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const detailsOpen = openDetailsId === word.id;
    const menuOpen = openMenuId === word.id;

    useEffect(() => {
        const close = () => setOpenMenuId(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    const handleRemove = async () => {
        try {
            await onRemoveFromGroup(word.id);
        } catch {
            setError("Failed to remove word from group");
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        setOpenMenuId(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await onDelete(word.id);
            setShowDeleteConfirm(false);
        } catch {
            setError("Failed to delete word");
            setShowDeleteConfirm(false);
        }
    };

    return (
        <>
            <tr onClick={() => {
                setOpenMenuId(null);
                setOpenDetailsId(detailsOpen ? null : word.id);
            }}>
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
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingWord(word);
                                    setOpenMenuId(null);
                                }}>
                                    Edit
                                </div>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                    setOpenMenuId(null);
                                }}>
                                    Remove from group
                                </div>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick();
                                }}>
                                    Delete permanently
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

            {editingWord && (
                <WordEditModal
                    word={editingWord}
                    onSave={async (wordText, translate) => {
                        await onUpdate(editingWord.id, wordText, translate);
                    }}
                    onClose={() => setEditingWord(null)}
                />
            )}

            {showDeleteConfirm && (
                <ConfirmModal
                    title="Delete Word Permanently"
                    message={`Are you sure you want to permanently delete "${word.word}"? This will remove it from all groups and cannot be undone.`}
                    confirmText="Delete Permanently"
                    cancelText="Cancel"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </>
    );
};