import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
    return res.render('home')
}

export {
    index
}