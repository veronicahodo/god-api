import { User } from "../../services/v1/userService.js";
import { Log } from "../../tools/logger.js";
import { handleError } from "../../tools/handleError.js";
import sendMail, { getMailTemplate } from "../../tools/mailer.js";
import { Auth } from "../../services/v1/authService.js";
import { emails } from "../../tools/emailRegistry.js";
import { Verify } from "../../services/v1/verifyService.js";

export const postUser = async (req, res) => {
    const unit = "userController.postUser";

    const { email, password, name, language } = req.body;

    try {
        const exists = await User.list({ email });

        // Make sure there is no duplicates
        if (exists.length > 0) {
            await Log.warn(unit, `User ${email} already exists`, "", req.ip);
            return res.status(400).json({
                error: "error:alreadyExists",
                message: "User already exists",
            });
        }
        // Create the actual user
        const user = await User.create({
            email,
            password_hash: Auth.hashPassword(password),
            name,
            language,
            verified: false,
            disabled: false,
            created_at: Date.now(),
            updated_at: Date.now(),
        });
        // Error out if we failed
        if (!user) {
            await Log.error(
                unit,
                "Error creating user: " +
                    JSON.stringify({ email, password, name }),
                "",
                req.ip
            );
            return res.status(500).json({
                error: "error:create",
                message: "Error creating user",
            });
        }
        // Send the new user verification email
        const token = await Verify.generateToken(user.id);
        const mail = getMailTemplate("verify", language);
        await sendMail(
            email,
            mail.subject,
            mail.textBody.replace(
                "%%VERIFY_URL%%",
                process.env.APP_URL + "/verify/" + token
            ),
            mail.htmlBody.replace(
                "%%VERIFY_URL%%",
                process.env.APP_URL + "/verify/" + token
            )
        );
        await Log.info(unit, `User ${email} created`, "", req.ip);
        return res.status(201).json({ message: "User created", data: user });
    } catch (error) {
        // General failure
        return await handleError(req, res, unit, error);
    }
};

export const postUserVerify = async (req, res) => {
    const unit = "userController.postUserVerify";

    const { token } = req.params;

    try {
        // Verify the token
        const verified = await Verify.confirm(token);
        // Error out if we failed
        if (!verified) {
            await Log.error(unit, "Error verifying user: " + token, "", req.ip);
            return res.status(400).json({
                error: "error:verify",
                message: "Error verifying user",
            });
        }
        // Update the user
        await User.update(verified, { verified: true, updated_at: Date.now() });
        // Generate a login token so the person doesn't have to login again
        const authToken = Auth.generateToken(verified);
        await Log.info(unit, `User verified`, "", req.ip);
        return res
            .status(200)
            .json({ message: "User verified", data: authToken });
    } catch (error) {
        // General failure
        return await handleError(req, res, unit, error);
    }
};

export const putUser = async (req, res) => {
    const unit = "userController.putUser";
    const refUser = req.user ? req.user.id : "";

    const { name, language } = req.body;

    const outData = {};
    if (name !== undefined) outData.name = name;
    if (language !== undefined) outData.language = language;

    try {
        // Make sure the user exists
        const user = await User.retrieve(refUser);
        if (!user) {
            await Log.warn(unit, `User ${user.id} not found`, refUser, req.ip);
            return res.status(404).json({
                error: "error:notFound",
                message: "User not found",
            });
        }
        // Make sure the user is not disabled
        if (user.disabled) {
            await Log.warn(
                unit,
                `User ${user.id} is disabled`,
                refUser,
                req.ip
            );
            return res.status(403).json({
                error: "error:disabled",
                message: "User is disabled",
            });
        }
        // Update the user
        await User.update(user.id, {
            ...outData,
            updated_at: Date.now(),
        });
        const updatedUser = await User.retrieve(user.id);
        await Log.info(unit, `User ${user.id} updated`, refUser, req.ip);
        return res
            .status(200)
            .json({ message: "User updated", data: updatedUser });
    } catch (error) {
        // General error
        return await handleError(req, res, unit, error);
    }
};
