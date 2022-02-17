import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusPublish } from "../enums/statusPublish";
import { Category } from "./Category";
import { Order } from "./Order";

@Entity('books')
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    slug: string

    @Column({ type: 'text' })
    description: string

    @Column()
    author: string

    @Column()
    publisher: string

    @Column()
    cover: string

    @Column({ type: 'float' })
    price: number

    @Column({ default: 0, unsigned: true })
    views: number

    @Column({ default: 0, unsigned: true })
    stock: number

    @Column({ type: 'enum', enum: StatusPublish })
    status: StatusPublish

    @Column()
    created_by: number

    @Column({ nullable: true })
    updated_by: number

    @Column({ nullable: true })
    deleted_by: number

    @ManyToMany(() => Category, category => category.books)
    @JoinTable({
        name: "book_category", // table name for the junction table of this relation
        joinColumn: {
            name: "book_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[]

    // @ManyToMany(() => Order)
    // @JoinTable()
    // orders: Order[]

    @Column()
    deleted_at: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
