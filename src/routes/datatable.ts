import express from 'express'
import { data, test, users } from '../controllers/user-datatable.controller'

const routerDatatable = express.Router()

routerDatatable.get('/users',users)
routerDatatable.get('/data', data)
routerDatatable.get('/test', test)

export default routerDatatable