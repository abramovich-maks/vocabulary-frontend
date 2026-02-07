import {useEffect, useState} from "react";
import {createGroups, deleteGroup, getAllGroups, updateGroup} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import {GroupItem} from "./GroupItem";
import CreateGroupModal from "./CreateGroupModal";
import type {GroupDto} from "../../models/models";
import {Button} from '../../components/Button';
import {CreateGroupButton} from './Groups.styles';
import GroupSelector from '../Group/GroupSelector';

import axios from "axios";

export default function GroupsPage() {
    const {isAuthenticated} = useAuth();

    const [groups, setGroups] = useState<GroupDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const loadGroups = async () => {
        try {
            const res = await getAllGroups();
            setGroups(res.data.groups);
            setError(null);
        } catch {
            setError("Failed to load groups");
        }
    };

    useEffect(() => {
        if (isAuthenticated) loadGroups();
    }, [isAuthenticated]);

    const handleDelete = async (id: number) => {
        try {
            await deleteGroup(id);
            loadGroups();
            setOpenId(null);
        } catch {
            setError("Failed to delete group");
        }
    };

    const handleDeleteWordFromGroup = async (idGroup: number, idWord ) => {
        try {
            await handleDeleteWordFromGroup(idGroup,idWord);
            loadGroups();
            setOpenId(null);
        } catch {
            setError("Failed to delete word from group");
        }
    };

    const handleUpdate = async (id: number, groupName: string) => {
        await updateGroup(id, {
            groupId: id,
            newGroupName: groupName
        });
        loadGroups();
    };


    const handleCreateGroup = async (groupName: string) => {
        try {
            setCreateLoading(true);
            setCreateError(null);

            const response = await createGroups({groupName});

            setGroups(prev => [...prev, {
                groupId: response.data.groupId,
                groupName: response.data.groupName
            }]);

            setShowCreateModal(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setCreateError(err.response?.data?.message ?? "Failed to create group");
            } else {
                setCreateError("Unexpected error");
            }
        } finally {
            setCreateLoading(false);
        }
    };

    const handleOpenModal = () => {
        setShowCreateModal(true);
        setCreateError(null);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setCreateError(null);
    };

    if (error) return <p>{error}</p>;

    return (
        <>
            <>
                <h2>My Groups</h2>
            </>

            {groups.length === 0 ? (
                <>
                    <p>No groups yet</p>
                    <CreateGroupButton onClick={handleOpenModal}>
                        Create your first group
                    </CreateGroupButton>
                </>
            ) : (
                <Button onClick={handleOpenModal}>
                    + Create Group
                </Button>
            )}

            {groups.map(group => (
                <GroupItem
                    key={group.groupId}
                    group={group}
                    isOpen={openId === group.groupId}
                    onToggle={setOpenId}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onRefreshGroups={loadGroups}
                />
            ))}

            {showCreateModal && (
                <CreateGroupModal
                    onSubmit={handleCreateGroup}
                    onClose={handleCloseModal}
                    loading={createLoading}
                    error={createError}
                />
            )}
        </>
    );
}