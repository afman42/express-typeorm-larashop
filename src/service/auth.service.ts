import { compare } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { typeAuthLogin } from "../types/auth";

const postLogin = async (req: Request, res: Response) => {
    try {
        const { email, password }: typeAuthLogin = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = errors.array()
            let data = []
            err.forEach(s => {
                data.push(s.msg)
            })
            req.session.errors = data
            return
        }

        const user = await getRepository(User).findOne({ where: { email }})
        if (!user) {
           req.session.errors = ['Error: Email Not Found'] 
           return
        }
        console.log(user)
        const isPassword = await compare(password, user.password)
        if (!isPassword) {
           req.session.errors = ['Error: Password Not Match'] 
           return
        }

        req.session.user = {
            id: user.id
        } 

        return true
    } catch (error) {
        console.log(error)
        req.session.errors = ["Error: Something Went Wrong"]
        return false
    }
}

export {
    postLogin
}