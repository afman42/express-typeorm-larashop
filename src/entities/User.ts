import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert } from "typeorm";
import { StatusRole } from "../enums/statusRole";
import { Order } from "./Order";
// import bcrypt from 'bcrypt'

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true})
    username: string;

    @Column()
    roles: string;

    @Column({ type: 'text', nullable: true})
    address: string;

    @Column({ nullable: true})
    phone: string;

    @Column({ nullable: true})
    avatar: string;

    @Column({ type:'enum', enum: StatusRole })
    status: StatusRole

    @Column({ unique: true})
    email: string;

    @Column()
    // @Column({ select: false})
    password: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Order, order => order.user)
    orders: Order[]


}
