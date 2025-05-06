import { body, validationResult } from "express-validator";

export const validatePostGroup = [
    body("name")
        .exists()
        .withMessage("name must exist")
        .notEmpty()
        .withMessage("name must not be empty")
        .isString()
        .withMessage("name must be a string")
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage("name must contain only letters and numbers"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
