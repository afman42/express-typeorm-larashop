import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Order1644388657115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'int',
                    // length: '11',
                    // unsigned: true
                },
                {
                    name: 'total_price',
                    type: 'float',
                    unsigned: true,
                    default: 0
                },
                {
                    name: 'invoice_number',
                    type: 'varchar',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['SUBMIT','PROCESS','FINISH','CANCEL']
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)
        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }

}
