import "express-session";
import { StatusPublish } from "../../src/enums/statusPublish";

interface TypePostBook {
    title: string | null
    description: string | null
    author: string | null
    publisher: string | null
    price: number | null
    stock: number | null 
    status: StatusPublish
}
declare module "express-session" {
    interface Session {
        errors: any;
    }
} 