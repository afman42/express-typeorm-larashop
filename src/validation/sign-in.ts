import { body, check } from "express-validator";

export const validateSignIn = [
    check('email', 'Fill Empty Email').not().isEmpty(),
    check('password', 'Fill Empty Password').not().isEmpty(),
    check('email', 'Please Format Email').isEmail()
]