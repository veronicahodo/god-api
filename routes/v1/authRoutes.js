import express from "express";
import { validatePostAuth } from "../../validators/v1/authValidator.js";
import { postAuth } from "../../controllers/v1/authController.js";

const router = express.Router();

router.post("/", validatePostAuth, postAuth);

export default router;
