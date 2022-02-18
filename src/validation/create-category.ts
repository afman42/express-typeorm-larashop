import { body, check } from "express-validator";

export const validateCreateCategories = [
    check('name', 'Fill Empty Name').not().isEmpty(),
    check('image').custom((value, s) => {
        if (!s.req.file) {
           return false 
        }
        return true
    }).withMessage('Fill Empty Image'),
]