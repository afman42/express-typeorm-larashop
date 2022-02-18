import { Request, Response } from "express";
import { ajaxSearch, deletePermanentCategory, destroyCategory, getCategoriesWithCountQuery, postCategory, putCategory, restoreCategory, showCategory, trashCategory } from "../service/category.service";

const categoryAjaxSearch = async (req: Request, res: Response) => {
    return await ajaxSearch(req, res)
}

const create = async (req: Request, res: Response) => {
    let title = 'Create Category' 
    let err = req.session.errors
    return res.render('categories/create', { title, err })
}

const index = async (req: Request, res: Response) => {
    let title = 'Category list'
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }
    let { keyword, page } = req.query as any 
    let pages = typeof page !== 'undefined' ? parseInt(page) : 1;
    let pathName:string = '/categories'
    let categories = await getCategoriesWithCountQuery(pages,keyword)
    return res.render('categories/index', { categories,pathName,title, keyword, alert })
}

const store = async (req: Request, res: Response) => {
    let model = await postCategory(req, res)
    if (model) {
        req.flash('alertMessage','Category successfully created')
        req.flash('alertStatus', 'success')
        res.redirect('/categories')
    } else {
        res.redirect('/categories/create')
    }
}

const show = async (req: Request, res: Response) => {
    let model = await showCategory(req,res)
    let title = 'Detail Category'
    return res.render('categories/show', { model, title })
}

const edit = async (req:Request, res:Response) => {
    let title = 'Edit Category'
    let model = await showCategory(req,res)
    let err = req.session.errors
    return res.render('categories/edit', { title, model, err })
}

const update = async (req: Request, res: Response) => {
    let { id } = req.params
    let model = await putCategory(req,res)
    if (model) {
        req.flash('alertMessage','Category successfully updated')
        req.flash('alertStatus', 'success')
        res.redirect('/categories')
    } else {
       res.redirect(`/categories/edit/${id}`) 
    }
}

const restore = async (req: Request, res: Response) => {
    let model = await restoreCategory(req, res);
    if (model) {
        req.flash('alertMessage','Category successfully trash')
        req.flash('alertStatus', 'success')
        res.redirect('/categories/trash')
    } else {
        req.flash('alertMessage','Category is not in trash')
        req.flash('alertStatus', 'success')
        res.redirect('/categories/trash')
    }
}

const trash = async (req: Request, res: Response) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }
    let { keyword,page } = req.query as any
    let pages = typeof page !== 'undefined' ? parseInt(page) : 1;
    let model = await trashCategory(keyword,pages);
    let title = 'Trashed Categories';
    let pathName = '/categories/trash' 
    // console.log(model)
    return res.render('categories/trash', { categories: model, keyword, alert, pathName, title})
}

const destroy = async (req: Request, res: Response) => {
    let model = await destroyCategory(req, res)
    if (model) {
        req.flash('alertMessage','Book successfully trash')
        req.flash('alertStatus', 'success')
        res.redirect('/categories')
    } else {
        req.flash('alertMessage','Something Went Wrong')
        req.flash('alertStatus', 'danger')
        res.redirect('/categories')
    }
}

const permanent = async (req: Request, res: Response) => {
    let model = await deletePermanentCategory(req, res);
    if (model) {
        req.flash('alertMessage','Category permanently deleted!')
        req.flash('alertStatus', 'success')
        res.redirect('/categories/trash')
    } else {
        req.flash('alertMessage','Something Went Wrong')
        req.flash('alertStatus', 'success')
        res.redirect('/categories/trash')
    }
}

export {
    categoryAjaxSearch,
    create,
    index,
    store,
    show,
    edit,
    update,
    trash,
    destroy,
    permanent,
    restore
}
 