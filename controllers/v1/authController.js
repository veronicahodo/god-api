import { Auth } from "../../services/v1/authService.js";
import { User } from "../../services/v1/userService.js";
import { handleError } from "../../tools/handleError.js";
import { Log } from "../../tools/logger.js";

export const postAuth = async (req, res) => {
    const unit = "authController.postAuth";

    const { email, password } = req.body;

    try {
        // Find the user
        const userList = await User.list({ email });
        if (userList.length === 0) {
            Log.warn(
                unit,
                `Could not find user with email ${email}`,
                "",
                req.ip
            );
            return res.status(401).json({ error: "error:invalidCredientials" });
        }
        const user = userList[0];
        if (!Auth.comparePassword(password, user.password_hash)) {
            Log.warn(unit, `Invalid password for user ${email}`, "", req.ip);
            return res.status(401).json({ error: "error:invalidCredientials" });
        }
        const token = Auth.generateToken(user);
        return res.status(200).json({ data: token });
    } catch (error) {
        // General error
        return await handleError(req, res, unit, error);
    }
};
