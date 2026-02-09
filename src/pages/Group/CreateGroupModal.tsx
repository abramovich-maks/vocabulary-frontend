import {useState} from "react";
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {ErrorMessage} from '../../components/ErrorMessage';
import {ModalOverlay, ModalCard} from './Groups.styles';

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
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <h3>Create New Group</h3>

                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '16px'}}>
                        <Input
                            placeholder="Group name"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button type="submit" disabled={loading || !groupName.trim()}>
                            {loading ? "Creating..." : "Create"}
                        </Button>
                        <Button type="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>

                    {error && <ErrorMessage style={{marginTop: '12px'}}>{error}</ErrorMessage>}
                </form>
            </ModalCard>
        </ModalOverlay>
    );
}