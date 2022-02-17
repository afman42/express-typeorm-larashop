import { Request, Response } from "express";

const viewLogin = (_: Request, res: Response) => {
    return res.render('auth/login',{ title: 'Login'});
}

const postLogin = (req: Request, res: Response) => {
    const { email, password } = req.body
}

export { viewLogin, postLogin }