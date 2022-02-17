import { Request, Response } from "express";
import { ajaxSearch } from "../service/category.service";

const categoryAjaxSearch = async (req: Request, res: Response) => {
    return await ajaxSearch(req, res)
}

export {
    categoryAjaxSearch
}