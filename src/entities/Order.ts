import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { StatusOrder } from "../enums/statusOrder";
import { User } from "./User";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unsigned: true })
    user_id: number

    @Column({ type: 'float', unsigned: true, default: 0 })
    total_price: number

    @Column()
    invoice_number: string

    @Column({ type: 'enum', enum: StatusOrder })
    status: StatusOrder

    @ManyToOne(() => User, user => user.orders)
    // @JoinColumn({
    //     name: 'user_id',
    //     referencedColumnName: 'id'
    // })
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    // $table->foreign('user_id')->references('id')->on('users');
}
