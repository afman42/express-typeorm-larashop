import { Book } from "../entities/Book";
import { getRepository, Like } from "typeorm";
import { Request, Response } from "express";
import { slugify } from "../utils/helper";
import { TypePostBook, TypePutBook } from "../types/book";
import { validationResult } from "express-validator";
import { Category } from "../entities/Category";
import { existsSync, stat, unlinkSync } from "fs";
import { BookCategory } from "../entities/BookCategory";

const getBookWithCountQuery = async (page: number, keyword: string, status: string | null) => {
    const takeNumber = 5
    const keywordS = keyword ? keyword : '';
    const pageFirst = (page > 1) ? (page * takeNumber) - takeNumber : 0
    const previous = page - 1
    const next = page + 1

    let model = await getRepository(Book).createQueryBuilder('books')
            .leftJoinAndSelect("books.categories", 'category')
            .take(takeNumber).skip(pageFirst)
            .where('books.deleted_at = 0')
    if ( typeof status !== 'undefined') {
        model = await model.andWhere('books.status = :status', { status })
    }
    if (typeof keyword !== 'undefined') { 
        model = await model.andWhere('books.title like :keyword', { keyword: `%${keywordS}%` })
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


const postBook = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            author,
            publisher,
            price,
            stock, status,
            categories
        }: TypePostBook = req.body
        let bookCover: any = req.file.filename;
        let modelCategories = []
        console.log(req.file.filename)

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

        await Promise.all(
            categories.map(async v => {
                await getRepository(Category).findOneOrFail({
                    where: { id: v }
                }).then(s => {
                    // console.log(s)
                    modelCategories.push(s)
                })
            })
        )
        // console.log('model ', modelCategories)

        const book = new Book();
        book.title = title
        book.description = description
        book.author = author
        book.publisher = publisher
        book.price = price
        book.deleted_at = 0
        book.stock = stock
        book.status = status
        book.slug = slugify(title)
        book.created_by = 1
        book.cover = bookCover
        book.categories = modelCategories
        return await getRepository(Book).save(book)
    } catch (error) {
        console.log(error)
        req.session.errors = ['Error : Something went Wrong']
    }
}

async function editBook(req: Request, res: Response) {
    let { id } = req.params
    let model = await getRepository(Book).findOneOrFail({ where: { id: parseInt(id) }, relations: ['categories'] })
    return model
}

async function putBook(req: Request, res: Response) {
    try {
        const {
            title,
            slug,
            description,
            author,
            publisher,
            price,
            stock, status,
            categories,
        }: TypePutBook = req.body
        let { id } = req.params
        let modelCategories = []

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


        await Promise.all(
            categories.map(async v => {
                await getRepository(Category).findOneOrFail({
                    where: { id: v }
                }).then(s => {
                    // console.log(s)
                    modelCategories.push(s)
                })
            })
        )

        let book = await getRepository(Book).findOneOrFail(id);
        book.title = title
        book.slug = slug
        book.description = description
        book.author = author
        book.publisher = publisher
        book.price = price
        book.stock = stock
        book.status = status
        if (req.file != undefined) {
            if (book.cover && existsSync(`./public/images/${book.cover}`)) {
                unlinkSync(`public/images/${book.cover}`)
            }
            book.cover = req.file.filename
        }
        book.updated_by = 1
        book.categories = modelCategories
        return await getRepository(Book).save(book)
    } catch (error) {
        console.log(error)
        req.session.errors = ['Error: Something Went Wrong']
    }

}

async function destroyBook(req: Request, res: Response) {
    let { id } = req.params
    let book = await getRepository(Book).findOneOrFail(id)
    book.deleted_at = 1
    return await getRepository(Book).save(book)
}

const trashBook = async (keyword: string,page:number) => {
    const takeNumber = 5
    const keywordS = keyword ? keyword : '';
    const pageFirst = (page > 1) ? (page * takeNumber) - takeNumber : 0
    const previous = page - 1
    const next = page + 1

    let model = await getRepository(Book).createQueryBuilder('books')
            .leftJoinAndSelect("books.categories", 'category')
            .take(takeNumber).skip(pageFirst)
            .where('books.deleted_at = 1')

    if (typeof keyword !== 'undefined') { 
        model = await model.andWhere('books.title like :keyword', { keyword: `%${keywordS}%` })
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

async function restoreBook(req: Request, res: Response) {
    let { id } = req.params
    let book = await getRepository(Book).findOneOrFail(id)
    book.deleted_at = 0
    return await getRepository(Book).save(book)
}

async function deletePermanentBook(req: Request, res: Response) {
    let { id } = req.params

    let bookCategory = await getRepository(BookCategory)
        .createQueryBuilder()
        .delete()
        .where("book_id = :bookId", { bookId: id })
        .execute()

    let book = await getRepository(Book)
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id })
        .andWhere("deleted_at = 1")
        .execute()


    return book && bookCategory
}
export {
    getBookWithCountQuery,
    postBook,
    editBook,
    putBook,
    destroyBook,
    trashBook,
    restoreBook,
    deletePermanentBook
}