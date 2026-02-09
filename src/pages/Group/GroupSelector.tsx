import type {GroupDto} from '../../models/models';
import {CreateGroupButton, CreateNewButton, Field, Select, SelectWrapper} from './Groups.styles';


interface Props {
    groups: GroupDto[];
    selectedGroupId: number | null;
    onSelectGroup: (groupId: number | null) => void;
    onCreateGroup: () => void;
}

export default function GroupSelector({groups, selectedGroupId, onSelectGroup, onCreateGroup}: Props) {
    return (
        <>
            {groups.length === 0 ? (
                <CreateGroupButton type="button" onClick={onCreateGroup}>
                    + Create your first group
                </CreateGroupButton>
            ) : (
                <SelectWrapper>
                    <Field>
                        <label>Group</label>
                        <Select
                            value={selectedGroupId ?? ""}
                            onChange={(e) => onSelectGroup(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">No group</option>
                            {groups.map(group => (
                                <option key={group.groupId} value={group.groupId}>
                                    {group.groupName}
                                </option>
                            ))}
                        </Select>
                        <CreateNewButton type="button" onClick={onCreateGroup}>
                            + Create new
                        </CreateNewButton>
                    </Field>
                </SelectWrapper>
            )}
        </>
    );
}