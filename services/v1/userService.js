import {
    createRecord,
    retrieveRecord,
    updateRecord,
    deleteRecord,
    listRecords,
    countRecords,
} from "../../tools/crud.js";

const userTable = "users";

export const User = {
    async create(data) {
        const id = await createRecord(userTable, "user_", data);
        return await this.retrieve(id);
    },

    async retrieve(id) {
        return await retrieveRecord(userTable, id);
    },

    async update(id, data) {
        return await updateRecord(userTable, id, data);
    },

    async delete(id) {
        return await deleteRecord(userTable, id);
    },

    async list(query) {
        return await listRecords(userTable, query);
    },

    async count(query) {
        return await countRecords(userTable, query);
    },
};
