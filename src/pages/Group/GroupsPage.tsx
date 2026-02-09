import {useEffect, useState} from "react";
import {
    addWord,
    addWordAutoTranslate,
    addWordsToGroup,
    addWordToGroup,
    createGroups,
    deleteGroup,
    getAllGroups,
    getAvailableWords,
    updateGroup
} from "../../composables/dictionaryApi";
import {useAuth} from "../../composables/AuthContext";
import {GroupRow} from "./GroupRow";
import CreateGroupModal from "./CreateGroupModal";
import GroupEditModal from "./GroupEditModal";
import AddWordToGroupModal from "./AddWordToGroupModal";
import AddExistingWordsModal from "./AddExistingWordsModal";
import type {GroupResponse, WordDto} from "../../models/models";
import {Button} from '../../components/Button';
import {CreateGroupButton, PageContent, Table, TableContainer} from './Groups.styles';

export default function GroupsPage() {
    const {isAuthenticated} = useAuth();

    const [groups, setGroups] = useState<GroupResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const [editingGroup, setEditingGroup] = useState<GroupResponse | null>(null);

    const [selectedGroup, setSelectedGroup] = useState<GroupResponse | null>(null);
    const [showAddWordModal, setShowAddWordModal] = useState(false);
    const [showAddExistingModal, setShowAddExistingModal] = useState(false);

    const [availableWords, setAvailableWords] = useState<WordDto[]>([]);

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
            setOpenMenuId(null);
        } catch {
            setError("Failed to delete group");
        }
    };

    const handleUpdate = async (id: number, groupName: string) => {
        await updateGroup(id, {
            newGroupName: groupName
        });
        loadGroups();
    };

    const handleCreateGroup = async (groupName: string) => {
        try {
            setCreateLoading(true);
            setCreateError(null);

            await createGroups({groupName});
            await loadGroups();

            setShowCreateModal(false);
        } catch (err: any) {
            setCreateError(err?.response?.data?.message ?? "Failed to create group");
        } finally {
            setCreateLoading(false);
        }
    };

    const loadAvailableWords = async (group: GroupResponse) => {
        try {
            const res = await getAvailableWords(group.groupId);
            setAvailableWords(res.data.words);
            setSelectedGroup(group);
            setShowAddExistingModal(true);
        } catch {
            setError("Failed to load available words");
        }
    };

    const handleAddNewWord = async (word: string, translate?: string) => {
        if (!selectedGroup) return;

        try {
            let createdWord;

            if (translate) {
                const response = await addWord({word, translate});
                createdWord = response.data;
            } else {
                const response = await addWordAutoTranslate({word});
                createdWord = response.data;
            }

            await addWordToGroup(selectedGroup.groupId, createdWord.id);
            await loadGroups();
            setShowAddWordModal(false);
        } catch (err: any) {
            throw err;
        }
    };

    const handleAddExistingWords = async (selectedIds: number[]) => {
        if (!selectedGroup) return;

        try {
            await addWordsToGroup(selectedGroup.groupId, selectedIds);
            await loadGroups();
            setShowAddExistingModal(false);
        } catch (err) {
            throw err;
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <PageContent>
            <h2>My Groups</h2>

            {groups.length === 0 ? (
                <>
                    <p>No groups yet</p>
                    <CreateGroupButton onClick={() => setShowCreateModal(true)}>
                        Create your first group
                    </CreateGroupButton>
                </>
            ) : (
                <>
                    <Button onClick={() => setShowCreateModal(true)}>
                        + Create Group
                    </Button>

                    <TableContainer>
                        <Table>
                            <thead>
                            <tr>
                                <th>Group Name</th>
                                <th>Words Count</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {groups.map(group => (
                                <GroupRow
                                    key={group.groupId}
                                    group={group}
                                    onDelete={handleDelete}
                                    onEdit={setEditingGroup}
                                    openMenuId={openMenuId}
                                    setOpenMenuId={setOpenMenuId}
                                    onAddExisting={loadAvailableWords}
                                    onAddNew={(group) => {
                                        setSelectedGroup(group);
                                        setShowAddWordModal(true);
                                    }}
                                />
                            ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                </>
            )}

            {showCreateModal && (
                <CreateGroupModal
                    onSubmit={handleCreateGroup}
                    onClose={() => setShowCreateModal(false)}
                    loading={createLoading}
                    error={createError}
                />
            )}

            {editingGroup && (
                <GroupEditModal
                    group={editingGroup}
                    onSave={async (groupName) => {
                        await handleUpdate(editingGroup.groupId, groupName);
                    }}
                    onClose={() => setEditingGroup(null)}
                />
            )}

            {showAddWordModal && selectedGroup && (
                <AddWordToGroupModal
                    groupName={selectedGroup.groupName}
                    onSubmit={handleAddNewWord}
                    onClose={() => setShowAddWordModal(false)}
                />
            )}

            {showAddExistingModal && selectedGroup && (
                <AddExistingWordsModal
                    groupName={selectedGroup.groupName}
                    availableWords={availableWords}
                    onSubmit={handleAddExistingWords}
                    onClose={() => setShowAddExistingModal(false)}
                />
            )}
        </PageContent>
    );
}