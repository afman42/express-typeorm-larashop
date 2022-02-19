import { body, check } from "express-validator";

export const validateUpdateUser = [
    check('name', 'Fill Empty Name').not().isEmpty(),
    // check('username', 'Fill Empty Username').not().isEmpty(),
    // check('email', 'Fill Empty Email').not().isEmpty(),
    check('roles', 'Fill Empty Array Roles').isArray({ min: 1 }),
    check('avatar').custom((value, s) => {
        if (!s.req.file) {
           return false 
        }
        return true
    }).withMessage('Fill Empty Image'),
    check('address', "Fill Empty Address").notEmpty(),
    check('phone', "Fill Empty Phone").notEmpty(),
    check('status', "Fill Empty Status").notEmpty(),
]