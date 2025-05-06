import {
    createRecord,
    retrieveRecord,
    updateRecord,
    deleteRecord,
    listRecords,
    countRecords,
} from "../../tools/crud.js";

const nodeTable = "nodes";

export const Node = {
    async create(data) {
        const id = await createRecord(nodeTable, "node_", data);
        return await this.retrieve(id);
    },

    async retrieve(id) {
        return await retrieveRecord(nodeTable, id);
    },

    async update(id, data) {
        return await updateRecord(nodeTable, id, data);
    },

    async delete(id) {
        return await deleteRecord(nodeTable, id);
    },

    async list(query) {
        return await listRecords(nodeTable, query);
    },

    async count(query) {
        return await countRecords(nodeTable, query);
    },
};
