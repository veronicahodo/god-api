import {
    createRecord,
    retrieveRecord,
    updateRecord,
    deleteRecord,
    listRecords,
    countRecords,
} from "../../tools/crud.js";

export const User = {
    async create(data) {
        const id = await createRecord("users", "user_", data);
        return await this.retrieve(id);
    },

    async retrieve(id) {
        return await retrieveRecord("users", id);
    },

    async update(id, data) {
        return await updateRecord("users", id, data);
    },

    async delete(id) {
        return await deleteRecord("users", id);
    },

    async list(query) {
        return await listRecords("users", query);
    },

    async count(query) {
        return await countRecords("users", query);
    },
};
