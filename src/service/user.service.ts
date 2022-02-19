import { hash } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { existsSync, unlinkSync } from "fs";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { TypePostUser } from "../types/user";

const getUsersWithCountQuery = async (page: number, keyword: string, status: string) => {
    const takeNumber = 5
    const keywordS = keyword ? keyword : '';
    const pageFirst = (page > 1) ? (page * takeNumber) - takeNumber : 0
    const previous = page - 1
    const next = page + 1

    let model = await getRepository(User).createQueryBuilder('users')
        .take(takeNumber).skip(pageFirst)
    if (typeof status !== 'undefined') {
        model = await model.where('users.status = :status', { status })
    }
    if (typeof keyword !== 'undefined') {
        model = await model.andWhere('users.email like :keyword', { keyword: `%${keywordS}%` })
    }

    let models = await model.getManyAndCount()

    let pageTotal = Math.ceil(models[1] / takeNumber)
    return {
        data: models[0],
        count: pageTotal,
        page,
        previous,
        next,
    }
}

const postUser = async (req: Request, res: Response) => {
    try {
        let {
            name,
            username,
            roles,
            address,
            phone,
            email,
            password
        }: TypePostUser = req.body
        let imageAvatar: any
        if (req.file != undefined) {
            imageAvatar = req.file.filename
        }
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
        const user = new User()
        user.name = name
        user.username = username
        user.roles = JSON.stringify(roles)
        user.address = address
        user.phone = phone
        user.email = email
        user.password = await hash(password, 8)
        user.avatar = imageAvatar

        return await getRepository(User).save(user)
    } catch (error) {
        console.log(error)
        req.session.errors = ['Error: Something Went Wrong']
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let user = await getRepository(User).findOneOrFail(id)
        return user
    } catch (error) {
        console.log(error)
    }
}

const putUser = async (req: Request, res: Response) => {
    try {
        let {
            name,
            roles,
            address,
            phone,
            status,
        } = req.body
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

        let user = await getRepository(User).findOneOrFail(req.params.id)
        user.name = name
        user.roles = JSON.stringify(roles)
        user.address = address
        user.phone = phone
        user.status = status
        if (req.file != undefined) {
            if (user.avatar && existsSync(`./public/images/${user.avatar}`)) {
                unlinkSync(`public/images/${user.avatar}`)
            }
            user.avatar = req.file.filename
        }

        return await getRepository(User).save(user)

    }catch(error){
        console.log(error)
        req.session.errors = ["Error: Something Went Wrong"]
    }
}

const destroyUser = async (req: Request, res: Response) => {
    try {
       let { id }  = req.params
       let user = await getRepository(User).createQueryBuilder('users')
                .delete()
                .where('users.id = :id', { id })
                .execute()
        return user
    } catch (error) {
       console.log(error) 
    }
}

export {
    getUsersWithCountQuery,
    postUser,
    editUser,
    putUser,
    destroyUser
}