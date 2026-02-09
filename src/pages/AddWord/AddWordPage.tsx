import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    addWord,
    addWordAutoTranslate,
    addWordToGroup,
    createGroups,
    getAllGroups
} from "../../composables/dictionaryApi";
import AddWordForm from "./AddWordForm";
import AddWordAutoForm from "./AddWordAutoForm";
import CreateGroupModal from "../Group/CreateGroupModal";
import axios from "axios";
import {PageContainer} from './AddWord.styles';
import type {GroupResponse} from '../../models/models';

export default function AddWordPage() {
    const navigate = useNavigate();
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);
    const [showManualForm, setShowManualForm] = useState(false);
    const [currentWord, setCurrentWord] = useState("");

    const [groups, setGroups] = useState<GroupResponse[]>([]);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [groupError, setGroupError] = useState<string | null>(null);
    const [groupLoading, setGroupLoading] = useState(false);

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        try {
            const response = await getAllGroups();
            setGroups(response.data.groups);
        } catch (err) {
            console.error("Failed to load groups:", err);
        }
    };

    const handleCreateGroup = async (groupName: string) => {
        try {
            setGroupLoading(true);
            setGroupError(null);

            const response = await createGroups({groupName});

            setGroups(prev => [...prev, {
                groupId: response.data.groupId,
                groupName: response.data.groupName,
                countWord: 0
            }]);

            setShowGroupModal(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setGroupError(err.response?.data?.message ?? "Failed to create group");
            } else {
                setGroupError("Unexpected error");
            }
        } finally {
            setGroupLoading(false);
        }
    };

    const handleAutoAdd = async (word: string, groupId?: number) => {
        if (!word.trim()) {
            setAddError("Please enter a word");
            return;
        }

        try {
            setAddLoading(true);
            setAddError(null);
            setCurrentWord(word);

            const response = await addWordAutoTranslate({word: word.trim()});
            const createdWord = response.data;

            if (groupId) {
                await addWordToGroup(groupId, createdWord.id);
                navigate(`/groups/${groupId}`);
            } else {
                navigate('/words');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAddError(err.response?.data?.message ?? "Failed to add word");
            } else {
                setAddError("Unexpected error");
            }
        } finally {
            setAddLoading(false);
        }
    };

    const handleAddWord = async (word: string, translate: string, groupId?: number) => {
        if (!word.trim() || !translate.trim()) {
            setAddError("Both fields are required");
            return;
        }

        try {
            setAddLoading(true);
            setAddError(null);

            const response = await addWord({
                word: word.trim(),
                translate: translate.trim()
            });
            const createdWord = response.data;

            if (groupId) {
                await addWordToGroup(groupId, createdWord.id);
                navigate(`/groups/${groupId}`);
            } else {
                navigate('/words');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAddError(err.response?.data?.message ?? "Failed to add word");
            } else {
                setAddError("Unexpected error");
            }
        } finally {
            setAddLoading(false);
        }
    };

    const handleSwitchToManual = () => {
        setShowManualForm(true);
        setAddError(null);
    };

    const handleBackToAuto = () => {
        setShowManualForm(false);
        setAddError(null);
    };

    const handleOpenGroupModal = () => {
        setShowGroupModal(true);
        setGroupError(null);
    };

    const handleCloseGroupModal = () => {
        setShowGroupModal(false);
        setGroupError(null);
    };

    return (
        <PageContainer>
            {!showManualForm ? (
                <AddWordAutoForm
                    onSubmit={handleAutoAdd}
                    onSwitchToManual={handleSwitchToManual}
                    loading={addLoading}
                    error={addError}
                    showManualOption={
                        addError?.includes("Unknown word") ||
                        addError?.includes("Failed to add word")
                    }
                    groups={groups}
                    onCreateGroup={handleOpenGroupModal}
                />
            ) : (
                <AddWordForm
                    onSubmit={handleAddWord}
                    onBack={handleBackToAuto}
                    initialWord={currentWord}
                    loading={addLoading}
                    error={addError}
                    groups={groups}
                    onCreateGroup={handleOpenGroupModal}
                />
            )}
            {showGroupModal && (
                <CreateGroupModal
                    onSubmit={handleCreateGroup}
                    onClose={handleCloseGroupModal}
                    loading={groupLoading}
                    error={groupError}
                />
            )}
        </PageContainer>
    );
}