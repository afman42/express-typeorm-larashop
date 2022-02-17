import {CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('book_category')
export class BookCategory {
    

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unsigned: true, nullable: true,})
    book_id: number

    @Column({ unsigned: true, nullable: true,})
    category_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    // $table->foreign('book_id')->references('id')->on('books');
    // $table->foreign('category_id')->references('id')->on('categories');
}
