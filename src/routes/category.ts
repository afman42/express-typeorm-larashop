import express from 'express'
import { create, index, show, store } from '../controllers/category.controller';
import { upload } from '../utils/upload';
import { validateCreateCategories } from '../validation/create-category';

const routerCategories = express.Router()

routerCategories.get('/',index);
routerCategories.get('/create',create);
// routerBook.get('/trash',isLogin, trash)
routerCategories.get('/show/:id', show)
// routerBook.get('/edit/:id',isLogin, edit)
// routerBook.post('/restore/:id',isLogin, restore)
routerCategories.post('/store',
    upload.single('image'),
    validateCreateCategories,
    // isLogin,
    store
)
// routerBook.put('/update/:id',
//     upload.single('cover'),
//     isLogin,
//     validateUpdateBook,
//     update
// )
// routerBook.delete('/destroy/:id',isLogin,destroy)
// routerBook.delete('/permanent/:id',isLogin,permanent)
export default routerCategories