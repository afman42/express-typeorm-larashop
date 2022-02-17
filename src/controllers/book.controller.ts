import { Response, Request } from "express";
import { RouteBook } from "../enums/routeBook";
import { deletePermanentBook, destroyBook, editBook, getBookWithCountQuery, postBook, putBook, restoreBook, trashBook } from "../service/book.service";

async function index(req: Request, res: Response) {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }
    let { status, keyword, page } = req.query as any 
    let pages = typeof page !== 'undefined' ? parseInt(page) : 1;
    let books
    let pathName
    if (status == null) {
       pathName = RouteBook.INDEX 
    }
    if (status == 'publish') {
       pathName = RouteBook.PUBLISH
    }
    if (status == 'draft') {
       pathName = RouteBook.DRAFT
    }
    if (status) {
        books = await getBookWithCountQuery(pages,keyword,status.toUpperCase())
    } else {
        books = await getBookWithCountQuery(pages,keyword,status)
    }

    console.log(books)
    console.log(pages)
    console.log(typeof status !== 'undefined')
    return res.render("books/index",{ books, status, keyword, pathName,alert, title: 'Book List' })
}

function create(req:Request, res: Response) {
    let err = req.session.errors
    let pathName = '/book/create'
    return res.render("books/create", { model: null, title: 'Create book',  err, pathName});
}

async function store(req: Request, res: Response){
    let model = await postBook(req, res)
    if(model){
        if (req.body.status == "PUBLISH") {
            req.flash('alertMessage','Book successfully saved and published')
            req.flash('alertStatus', 'success')
            res.redirect('/book')
        } else {
            req.flash('alertMessage','Book saved as draft')
            req.flash('alertStatus', 'success')
            res.redirect('/book')
        }
    }else{
        return res.redirect('/book/create')
    }
}

async function edit(req: Request, res: Response){
    let err = req.session.errors
    let pathName = '/book/edit'
    let model = await editBook(req,res)
    return res.render('books/edit',{ model, title:'Edit book', err, pathName })
}

async function update(req: Request, res: Response){
    let { id } = req.params
    let model = await putBook(req,res)
    if (model) {
        req.flash('alertMessage','Book successfully updated')
        req.flash('alertStatus', 'success')
        res.redirect('/book')
    } else {
       res.redirect(`/book/edit/${id}`) 
    }
}

async function destroy(req: Request, res: Response){
    let model = await destroyBook(req, res)
    if (model) {
        req.flash('alertMessage','Book successfully trash')
        req.flash('alertStatus', 'success')
        res.redirect('/book')
    } else {
        req.flash('alertMessage','Something Went Wrong')
        req.flash('alertStatus', 'danger')
        res.redirect('/book')
    }
}

async function trash(req: Request, res: Response){
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }
    let { keyword } = req.query as any
    let model = await trashBook(keyword,null,null);
    let title = 'Trashed Books';
    let pathName = RouteBook.INDEX 
    // console.log(model)
    return res.render('books/trash', { model,alert, pathName, title})
}

async function restore(req: Request, res: Response){
    let model = await restoreBook(req, res);
    if (model) {
        req.flash('alertMessage','Book successfully trash')
        req.flash('alertStatus', 'success')
        res.redirect('/book/trash')
    } else {
        req.flash('alertMessage','Book is not in trash')
        req.flash('alertStatus', 'success')
        res.redirect('/book/trash')
    }
}

async function permanent(req: Request, res: Response){
    let model = await deletePermanentBook(req, res);
    if (model) {
        req.flash('alertMessage','Book permanently deleted!')
        req.flash('alertStatus', 'success')
        res.redirect('/book/trash')
    } else {
        req.flash('alertMessage','Book is not in trash!')
        req.flash('alertStatus', 'success')
        res.redirect('/book/trash')
    }
}
export {
    index,
    create,
    store,
    edit,
    update,
    destroy,
    trash,
    restore,
    permanent
}
