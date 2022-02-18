import express from 'express'
import { create, destroy, edit, index, permanent, restore, show, store, trash, update } from '../controllers/category.controller';
import { upload } from '../utils/upload';
import { validateCreateCategories } from '../validation/create-category';
import { validateUpdateCategories } from '../validation/update-category';

const routerCategories = express.Router()

routerCategories.get('/',index);
routerCategories.get('/create',create);
routerCategories.get('/trash', trash)
routerCategories.get('/show/:id', show)
routerCategories.get('/edit/:id', edit)
routerCategories.post('/restore/:id', restore)
routerCategories.post('/store',
    upload.single('image'),
    validateCreateCategories,
    // isLogin,
    store
)
routerCategories.put('/update/:id',
    upload.single('image'),
    // isLogin,
    validateUpdateCategories,
    update
)
routerCategories.delete('/destroy/:id',destroy)
routerCategories.delete('/permanent/:id',permanent)
export default routerCategories