import express from 'express'
import { viewLogin, postLogin, logout } from '../controllers/auth.controller';
import { validateSignIn } from '../validation/sign-in';

const routerAuth = express.Router()

routerAuth.get('/',viewLogin);
routerAuth.post('/login',validateSignIn, postLogin);
routerAuth.post('/logout', logout);

export default routerAuth