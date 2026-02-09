import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {GroupResponse} from "../../models/models";
import {ActionsButton, DropdownMenu} from "./Groups.styles";
import ConfirmModal from "../../components/ConfirmModal";

interface Props {
    group: GroupResponse;
    onDelete: (id: number) => Promise<void>;
    onEdit: (group: GroupResponse) => void;
    openMenuId: number | null;
    setOpenMenuId: (id: number | null) => void;
    onAddExisting: (group: GroupResponse) => void;
    onAddNew: (group: GroupResponse) => void;
}

export const GroupRow = ({
                             group,
                             onDelete,
                             onEdit,
                             openMenuId,
                             setOpenMenuId,
                             onAddExisting,
                             onAddNew
                         }: Props) => {

    const [error, setError] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const menuOpen = openMenuId === group.groupId;
    const navigate = useNavigate();

    useEffect(() => {
        const close = () => setOpenMenuId(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        setOpenMenuId(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await onDelete(group.groupId);
            setShowDeleteConfirm(false);
        } catch {
            setError("Failed to delete group");
            setShowDeleteConfirm(false);
        }
    };

    const handleRowClick = () => {
        navigate(`/groups/${group.groupId}`);
    };

    return (
        <>
            <tr onClick={handleRowClick}>
                <td>{group.groupName}</td>
                <td>{group.countWord} words</td>

                <td>
                    <div style={{position: "relative", display: "inline-block"}}>
                        <ActionsButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(menuOpen ? null : group.groupId);
                            }}
                        >
                            ⋮
                        </ActionsButton>

                        {menuOpen && (
                            <DropdownMenu onClick={e => e.stopPropagation()}>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    onAddExisting(group);
                                    setOpenMenuId(null);
                                }}>
                                    Add existing words
                                </div>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    onAddNew(group);
                                    setOpenMenuId(null);
                                }}>
                                    Add new word
                                </div>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(group);
                                    setOpenMenuId(null);
                                }}>
                                    Rename
                                </div>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick();
                                }}>
                                    Delete
                                </div>
                            </DropdownMenu>
                        )}
                    </div>
                </td>
            </tr>

            {error && (
                <tr>
                    <td colSpan={3}>
                        <ErrorMessage>{error}</ErrorMessage>
                    </td>
                </tr>
            )}

            {showDeleteConfirm && (
                <ConfirmModal
                    title="Delete Group"
                    message={`Are you sure you want to delete the group "${group.groupName}"? This will not delete the words, only the group.`}
                    confirmText="Delete Group"
                    cancelText="Cancel"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </>
    );
};