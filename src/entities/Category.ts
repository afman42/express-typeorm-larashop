import {Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, DeleteDateColumn, ManyToMany} from "typeorm";
import { Book } from "./Book";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true})
    slug: string;

    @Column()
    image: string;

    @Column()
    created_by: number;

    @Column({ nullable: true })
    updated_by: number;

    @Column({ nullable: true })
    deleted_by: number;

    @ManyToMany(() => Book)
    books: Book[]

    // @DeleteDateColumn()
    // deleted_at: Date
    @Column()
    deleted_at: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
