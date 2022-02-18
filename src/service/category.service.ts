import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getRepository, Like } from "typeorm";
import { Category } from '../entities/Category'
import { TypePostCategory } from "../types/category";
import { slugify } from "../utils/helper";

async function ajaxSearch(req: Request, res: Response) {
    let keyword = req.query.q;

    let categories = await getRepository(Category).find({
        where: { name: Like('%' + keyword + "%") }
    })

    return res.status(200).json(categories)
}

const getCategoriesWithCountQuery = async (page: number, keyword: string) => {

    const takeNumber = 5
    const keywordS = keyword ? keyword : '';
    const pageFirst = (page > 1) ? (page * takeNumber) - takeNumber : 0
    const previous = page - 1
    const next = page + 1

    let model = await getRepository(Category).createQueryBuilder('categories')
        .take(takeNumber).skip(pageFirst)
        .where('categories.deleted_at = 0')

    if (typeof keyword !== 'undefined') {
        model = await model.andWhere('categories.name like :keyword', { keyword: `%${keywordS}%` })
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

const postCategory = async (req: Request, res: Response) => {
    try {
        const { name }: TypePostCategory = req.body
        let imageCover: string
        if (req.file != undefined) {
            imageCover = req.file.filename;
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

        const category = new Category()
        category.name = name
        category.image = imageCover
        category.slug = slugify(name)
        category.deleted_at = 0
        category.created_by = 1

        return await getRepository(Category).save(category)
    } catch (error) {
        console.log(error)
        req.session.errors = ['Error Something Went Wrong']
    }
}

const showCategory = async (req: Request, res: Response) => {
    let { id } = req.params
    let category = await getRepository(Category).findOneOrFail(id)
    return category
}

export {
    ajaxSearch,
    getCategoriesWithCountQuery,
    postCategory,
    showCategory
}