import express from "express";
import {
    validatePostUser,
    validatePostUserVerify,
    validatePutUser,
} from "../../validators/v1/userValidator.js";
import {
    postUser,
    postUserVerify,
    putUser,
} from "../../controllers/v1/userController.js";
import { secureAuthenticate } from "../../middleware/auth.js";

const router = express.Router();

router.post("/verify/:token", validatePostUserVerify, postUserVerify);
router.post("/", validatePostUser, postUser);

router.put("/", validatePutUser, secureAuthenticate, putUser);

export default router;
