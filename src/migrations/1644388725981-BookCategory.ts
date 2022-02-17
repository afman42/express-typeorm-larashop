import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class BookCategory1644388725981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'book_category',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'book_id',
                    type: 'int',
                    // unsigned: true,
                    isNullable: true
                },
                {
                    name: 'category_id',
                    type: 'int',
                    // unsigned: true,
                    isNullable: true
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


        await queryRunner.createForeignKey("book_category", new TableForeignKey({
            columnNames: ["book_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
        }));

        await queryRunner.createForeignKey("book_category", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("book_category");
    }

}
