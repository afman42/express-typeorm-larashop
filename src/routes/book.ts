import express from 'express'
import { create, destroy, edit, index, permanent, restore, store, trash, update } from '../controllers/book.controller'
import { upload } from '../utils/upload'
import { validateCreateBook } from '../validation/create-book'
import { validateUpdateBook } from '../validation/update-book'

const routerBook = express.Router()
routerBook.get('/', index)
routerBook.get('/create', create)
routerBook.get('/trash', trash)
routerBook.get('/edit/:id', edit)
routerBook.post('/restore/:id', restore)
routerBook.post('/create',
    upload.single('cover'),
    validateCreateBook,
    store
)
routerBook.put('/update/:id',
    upload.single('cover'),
    validateUpdateBook,
    update
)
routerBook.delete('/destroy/:id',destroy)
routerBook.delete('/permanent/:id',permanent)
export default routerBook