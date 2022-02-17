import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Book } from '../entities/Book'
import { StatusPublish } from '../enums/statusPublish'
import { Category } from '../entities/Category'
import { BookCategory } from '../entities/BookCategory'
 
export default class CreateData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder()
        .insert()
        .into(Book)
        .values([
            { title: 'ABC', slug: '/ABC', author: 'ABC', description: 'ABC', publisher: 'ABC', cover: "ABC", price: 2.2, views: 1, stock: 1, status: StatusPublish.DRAFT, created_by: 1},
            { title: 'DEF', slug: '/DEF', author: 'DEF', description: 'DEF', publisher: 'DEF', cover: "DEF", price: 2.2, views: 1, stock: 1, status: StatusPublish.DRAFT, created_by: 1}
        ]).execute()
    
    await connection.createQueryBuilder()
        .insert()
        .into(Category)
        .values([
            { name: "ADD", slug: "ADD", image: 'abv', created_by:1, deleted_at:0},
            { name: "AAA", slug: "aaaa", image: 'aaaa', created_by:1, deleted_at:0}
        ]).execute()

    await connection.createQueryBuilder()
        .insert()
        .into(BookCategory)
        .values([
            { book_id: 1, category_id: 1},
            { book_id: 1, category_id: 2},
            { book_id: 2, category_id: 2}
        ]).execute()
    
  }
}