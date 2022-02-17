import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class BookOrder1644388737431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'book_order',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'order_id',
                    type: 'int',
                    // unsigned: true,
                    isNullable: true
                },
                {
                    name: 'book_id',
                    type: 'int',
                    // unsigned: true,
                    isNullable: true
                },
                {
                    name: 'quantity',
                    type: 'int',
                    unsigned: true,
                    default: 1
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
        }))


        await queryRunner.createForeignKey("book_order", new TableForeignKey({
            columnNames: ["book_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
        }));

        await queryRunner.createForeignKey("book_order", new TableForeignKey({
            columnNames: ["order_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "orders",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("book_order");
    }

}
