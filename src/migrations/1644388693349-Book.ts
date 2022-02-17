import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Book1644388693349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'books',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'slug',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'author',
                    type: 'varchar',
                },
                {
                    name: 'publisher',
                    type: 'varchar',
                },
                {
                    name: 'cover',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'float',
                    default: 0.0
                },
                {
                    name: 'views',
                    type: 'int',
                    default: 0,
                    unsigned: true
                },
                {
                    name: 'stock',
                    type: 'int',
                    default: 0,
                    unsigned: true
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ["PUBLISH","DRAFT"]
                },
                {
                    name: 'created_by',
                    type: 'int',
                },
                {
                    name: 'updated_by',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'deleted_by',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'deleted_at',
                    type: 'int',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books");
    }

}
