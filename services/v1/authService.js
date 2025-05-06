import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Auth = {
    hashPassword(password) {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    },
    comparePassword(password, hash) {
        const result = bcrypt.compareSync(password, hash);
        return result;
    },
    generateToken(user) {
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );
        return token;
    },
};
