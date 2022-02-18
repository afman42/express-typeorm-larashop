import { body, check } from "express-validator";

export const validateUpdateCategories = [
    check('name', 'Fill Empty Name').not().isEmpty(),
    check('slug', 'Fill Empty Slug').not().isEmpty(),
    check('image').custom((value, s) => {
        if (!s.req.file) {
           return false 
        }
        return true
    }).withMessage('Fill Empty Image'),
]