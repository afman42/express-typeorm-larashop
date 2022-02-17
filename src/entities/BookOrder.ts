import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('book_order')
export class BookOrder {


    @PrimaryGeneratedColumn()
    id: number

    @Column({ unsigned: true })
    order_id: number

    @Column({ unsigned: true })
    book_id: number

    @Column({ unsigned: true, default: 1 })
    quantity: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    // $table->foreign('order_id')->references('id')->on('orders');
    // $table->foreign('book_id')->references('id')->on('books');
}
