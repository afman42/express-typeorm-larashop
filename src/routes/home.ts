import express from 'express'
import { index } from '../controllers/Home.controller'

const routerHome = express.Router()

routerHome.get('/home',index);

export default routerHome