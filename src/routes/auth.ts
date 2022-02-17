import express from 'express'
import { viewLogin, postLogin } from '../controllers/auth.controller';

const routerAuth = express.Router()

routerAuth.get('/',viewLogin);
routerAuth.post('/login',postLogin);

export default routerAuth