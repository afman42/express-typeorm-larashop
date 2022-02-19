import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import { Order } from "../entities/Order";

const editOrder = async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let order = await getRepository(Order).findOneOrFail(id)
        return order
    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        let { status } = req.body
        let { id } = req.params

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
        let order = await getRepository(Order).findOneOrFail(id)
        order.status = status
        return await getRepository(Order).save(order)
    } catch (error) {
       console.log(error) 
       req.session.errors = ['Error: Something Went Wrong']
    }
}

const indexOrder = async (req: Request, res: Response) => {

}

export {
    editOrder,
    updateOrder,
    indexOrder
}