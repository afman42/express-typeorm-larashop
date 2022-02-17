import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { Category } from '../entities/Category'

async function ajaxSearch(req: Request, res: Response){
    let keyword = req.query.q;

    let categories = await getRepository(Category).find({
        where: { name: Like('%' + keyword + "%")}
    })

    return res.status(200).json(categories)
    // return categories;
    // console.log(categories)
}

export {
    ajaxSearch
}