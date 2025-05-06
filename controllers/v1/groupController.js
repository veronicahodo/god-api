import { Group } from "../../services/v1/groupService.js";
import { handleError } from "../../tools/handleError.js";
import { Log } from "../../tools/logger.js";

export const postGroup = async (req, res) => {
    const unit = "groupController.postGroup";
    const refUser = req.user ? req.user.id : "";

    const { name } = req.body;
    try {
        // make sure we don't have a group named the same
        const exists = await Group.getGroups();
        if (exists.find((g) => g.name === name)) {
            await Log.warn(
                unit,
                `Group already exists: ${name}`,
                refUser,
                req.ip
            );
            return res
                .status(400)
                .json({
                    message: "Group already exists",
                    error: "error:duplicate",
                });
        }
        // add the group
        const group = await Group.create(name);
        await Log.info(unit, `Group created: ${name}`, refUser, req.ip);
        return res.status(201).json({ message: "Group created", data: group });
    } catch (error) {
        return await handleError(req, res, unit, error);
    }
};
