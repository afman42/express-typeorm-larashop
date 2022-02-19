import express from 'express'
import { create, destroy, edit, index, permanent, restore, show, store, trash, update } from '../controllers/category.controller';
import isLogin from '../middleware/auth';
import { upload } from '../utils/upload';
import { validateCreateCategories } from '../validation/create-category';
import { validateUpdateCategories } from '../validation/update-category';

const routerCategories = express.Router()

routerCategories.get('/',isLogin, index);
routerCategories.get('/create',isLogin,create);
routerCategories.get('/trash',isLogin, trash)
routerCategories.get('/show/:id',isLogin, show)
routerCategories.get('/edit/:id',isLogin, edit)
routerCategories.post('/restore/:id',isLogin, restore)
routerCategories.post('/store',
    upload.single('image'),
    validateCreateCategories,
    isLogin,
    store
)
routerCategories.put('/update/:id',
    upload.single('image'),
    isLogin,
    validateUpdateCategories,
    update
)
routerCategories.delete('/destroy/:id',isLogin,destroy)
routerCategories.delete('/permanent/:id',isLogin,permanent)
export default routerCategories