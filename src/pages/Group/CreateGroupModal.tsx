import {useState} from "react";
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {ErrorMessage} from '../../components/ErrorMessage';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    InputWrapper
} from './Groups.styles';

interface Props {
    onSubmit: (groupName: string) => void;
    onClose: () => void;
    loading?: boolean;
    error?: string | null;
}

export default function CreateGroupModal({onSubmit, onClose, loading, error}: Props) {
    const [groupName, setGroupName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (groupName.trim()) {
            onSubmit(groupName.trim());
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>Create new group</h2>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                    <InputWrapper>
                        <Input
                            placeholder="Group name"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            autoFocus
                        />
                    </InputWrapper>

                    <Button type="submit" disabled={loading || !groupName.trim()}>
                        {loading ? "Creating..." : "Create group"}
                    </Button>
                    <Button onClick={onClose}>Close</Button>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
            </ModalContent>
        </ModalOverlay>
    );
}