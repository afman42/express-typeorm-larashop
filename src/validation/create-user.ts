import { body, check } from "express-validator";

export const validateCreateUser = [
    check('username', 'Fill Empty Username').not().isEmpty(),
    check('name', 'Fill Empty Name').not().isEmpty(),
    check('roles', 'Fill Empty Array Roles').isArray({ min: 1 }),
    check('avatar').custom((value, s) => {
        if (!s.req.file) {
           return false 
        }
        return true
    }).withMessage('Fill Empty Image'),
    check('password_confirmation').custom((value, s) => {
        if (value !== s.req.body.password) {
           return false 
        }
        return true
    }).withMessage('Fill Match the Password'),
    check('password_confirmation', "Fill Empty Password Confirmation").notEmpty(),
    check('password', "Fill Empty Password").notEmpty(),
    check('email', "Fill Empty Email").notEmpty(),
    check('email', "Please Format Email").isEmail(),
    check('address', "Fill Empty Address").notEmpty(),
    check('phone', "Fill Empty Phone").notEmpty(),
]