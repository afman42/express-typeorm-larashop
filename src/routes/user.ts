import express from "express"
import { create, destroy, edit, index, show, store, update } from "../controllers/user.controller"
import { upload } from "../utils/upload"
import { validateCreateUser } from "../validation/create-user"
import { validateUpdateUser } from "../validation/update-user"

const routerUser = express.Router()

routerUser.get('/', index)
routerUser.get('/create', create)
routerUser.get('/show/:id', show)
routerUser.get('/edit/:id', edit)
routerUser.post('/store',
    upload.single('avatar'),
    validateCreateUser,
    store
)
routerUser.put('/update/:id',
    upload.single('avatar'),
    validateUpdateUser,
    update 
)
routerUser.delete('/destroy/:id',destroy)
export default routerUser