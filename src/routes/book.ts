import express from 'express'
import { create, destroy, edit, index, permanent, restore, store, trash, update } from '../controllers/book.controller'
import { upload } from '../utils/upload'
import { validateCreateBook } from '../validation/create-book'
import { validateUpdateBook } from '../validation/update-book'
import isLogin from '../middleware/auth'

const routerBook = express.Router()
routerBook.get('/',isLogin, index)
routerBook.get('/create',isLogin, create)
routerBook.get('/trash',isLogin, trash)
routerBook.get('/edit/:id',isLogin, edit)
routerBook.post('/restore/:id',isLogin, restore)
routerBook.post('/create',
    upload.single('cover'),
    validateCreateBook,
    isLogin,
    store
)
routerBook.put('/update/:id',
    upload.single('cover'),
    isLogin,
    validateUpdateBook,
    update
)
routerBook.delete('/destroy/:id',isLogin,destroy)
routerBook.delete('/permanent/:id',isLogin,permanent)
export default routerBook