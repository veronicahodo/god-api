import db from "../../tools/db.js";
import { generateBase32String } from "../../tools/base32.js";

const verificationTable = "verification";

export const Verify = {
    async confirm(token) {
        const verification = await db(verificationTable)
            .where({ token })
            .first();
        if (!verification) return false;
        if (verification.expires_at < Date.now()) return false;
        await db(verificationTable).where({ token }).delete();
        return verification.user_id;
    },

    async generateToken(userId) {
        const token = generateBase32String(8);
        await db(verificationTable).insert({
            user_id: userId,
            token,
            expires_at: Date.now() + 1000 * 60 * 60 * 24,
        });
        return token;
    },
};
