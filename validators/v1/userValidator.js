import { body, param, validationResult } from "express-validator";

export const validatePostUser = [
    body("email")
        .exists()
        .withMessage("email must exist")
        .isEmail()
        .withMessage("email must be valid"),
    body("password")
        .exists()
        .withMessage("password must exist")
        .isString()
        .isLength({ min: 8, max: 50 })
        .withMessage("password must be between 8 and 50 characters"),
    body("name")
        .exists()
        .withMessage("name must exist")
        .isString()
        .isLength({ min: 1, max: 150 })
        .withMessage("name must be between 1 and 150 characters"),
    body("language")
        .optional()
        .isString()
        .isLength({ min: 2, max: 2 })
        .withMessage("language must be 2 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validatePostUserVerify = [
    param("token")
        .exists()
        .withMessage("token must exist")
        .isString()
        .isLength({ min: 8, max: 8 })
        .withMessage("token must be 8 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validatePutUser = [
    body("name")
        .optional()
        .isString()
        .isLength({ min: 1, max: 150 })
        .withMessage("name must be between 1 and 150 characters"),
    body("language")
        .optional()
        .isString()
        .isLength({ min: 2, max: 2 })
        .withMessage("language must be 2 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
