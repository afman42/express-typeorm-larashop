import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Category1644388075164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'image',
                    type: 'varchar',
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
                    type: 'int'
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
        await queryRunner.dropTable("category");
    }

}
