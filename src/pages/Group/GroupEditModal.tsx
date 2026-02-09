import {useState} from "react";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {ErrorMessage} from "../../components/ErrorMessage";
import type {GroupResponse} from "../../models/models";
import {ModalCard, ModalOverlay} from "./Groups.styles";

interface Props {
    group: GroupResponse;
    onSave: (groupName: string) => Promise<void>;
    onClose: () => void;
}

export default function GroupEditModal({group, onSave, onClose}: Props) {
    const [groupName, setGroupName] = useState(group.groupName);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            await onSave(groupName);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to add word");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <h3>Rename Group</h3>

                <div style={{marginBottom: '12px'}}>
                    <Input
                        placeholder="Group name"
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                    />
                </div>

                <div style={{display: "flex", gap: 10}}>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>

                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                </div>

                {error && <ErrorMessage style={{marginTop: '12px'}}>{error}</ErrorMessage>}
            </ModalCard>
        </ModalOverlay>
    );
}