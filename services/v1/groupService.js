import db from "../../tools/db.js";
import { createRecord } from "../../tools/crud.js";

const groupsTable = "groups";
const groupMembersTable = "group_members";

export const Group = {
    async create(name) {
        return await createRecord(groupsTable, "group_", { label: name });
    },
    async addMember(groupId, userId) {
        await db(groupMembersTable).insert({
            group_id: groupId,
            user_id: userId,
        });
        return true;
    },
    async removeMember(groupId, userId) {
        await db(groupMembersTable).delete({
            group_id: groupId,
            user_id: userId,
        });
        return true;
    },
    async getMembers(groupId) {
        return await db(groupMembersTable)
            .where({ group_id: groupId })
            .select();
    },
    async getGroups() {
        return await db(groupsTable).select();
    },
    async getMemberOf(userId) {
        return await db(groupMembersTable).where({ user_id: userId }).select();
    },
    async isMemberOf(groupId, userId) {
        return await db(groupMembersTable)
            .where({ group_id: groupId, user_id: userId })
            .select();
    },
};
