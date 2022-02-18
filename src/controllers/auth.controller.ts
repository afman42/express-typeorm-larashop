import { Request, Response } from "express";
import { postLogin as postSignin } from "../service/auth.service";

const viewLogin = (req: Request, res: Response) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        const err = req.session.errors
        if (req.session.user == null || req.session.user == undefined) { 
            return res.render('auth/login',{ title: 'Login', alert, err});
        }else{
            res.redirect('/home')
        }
    } catch (error) {
       console.log(error) 
       res.redirect('/')
    }
}

const postLogin = async (req: Request, res: Response) => {
    let model = await postSignin(req,res)
    if (model) {
        req.flash('alertMessage','Great! You are Login')
        req.flash('alertStatus', 'success')
        res.redirect('/home')
    } else {
       res.redirect('/') 
    }
}

const logout = async (req: Request, res: Response) => {
    req.session.user = null
    res.redirect('/');    
}
export { viewLogin, postLogin, logout }