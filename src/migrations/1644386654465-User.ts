import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1644386654465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'roles',
                    type: 'varchar'
                },
                {
                    name: 'address',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['ACTIVE', 'INACTIVE']
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar'
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
        await queryRunner.dropTable("users");
    }

}
