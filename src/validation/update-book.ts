import { body, check } from "express-validator";

export const validateUpdateBook = [
    check('title', 'Fill Empty Title').not().isEmpty(),
    check('slug', 'Fill Empty Slug').not().isEmpty(),
    check('categories', 'Fill Empty Array Categories').isArray({ min: 1 }),
    check('cover').custom((value, s) => {
        if (!s.req.file) {
           return false 
        }
        return true
    }).withMessage('Fill Empty Image'),
    check('description', "Fill Empty Description").notEmpty(),
    check('author', "Fill Empty Author").notEmpty(),
    check('publisher', "Fill Empty Publisher").notEmpty(),
    check('price', "Fill Empty Price").notEmpty(),
    check('stock', "Fill Empty Stock").notEmpty(),
]