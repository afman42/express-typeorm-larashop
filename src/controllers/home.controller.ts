import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };
    return res.render('home', { alert })
}

export {
    index
}