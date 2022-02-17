import { StatusPublish } from "../enums/statusPublish";
export interface TypePostBook {
    title: string | null
    description: string | null
    author: string | null
    publisher: string | null
    price: number | null
    stock: number | null
    status: StatusPublish
    categories: string[]
}

export interface TypePutBook {
    title: string | null
    slug: string | null
    description: string | null
    author: string | null
    publisher: string | null
    price: number | null
    stock: number | null 
    status: StatusPublish
    categories: string[]
}