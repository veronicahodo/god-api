import db from "./db.js";
import generateId from "./generateId.js";

export const createRecord = async (table, prefix, record) => {
    const id = await generateId(table, prefix);
    record.id = id;
    await db(table).insert(record);
    return id;
};

export const retrieveRecord = async (table, id) => {
    const record = await db(table).where({ id }).first();
    return record;
};

export const updateRecord = async (table, id, record) => {
    await db(table).where({ id }).update(record);
    return true;
};

export const deleteRecord = async (table, id) => {
    await db(table).where({ id }).del();
    return true;
};

export const listRecords = async (table, query) => {
    const records = await db(table).where(query);
    return records;
};

export const countRecords = async (table, query) => {
    const count = await db(table).where(query).count();
    return count;
};
