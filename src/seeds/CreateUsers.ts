import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entities/User'
import { StatusRole } from "../enums/statusRole";
import { hash } from 'bcrypt';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> { 
      await connection.manager.createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { 
                    name : 'admin', 
                    username: 'admin', 
                    roles: 'ADMIN', 
                    status: StatusRole.INACTIVE, 
                    email: 'admin@example.com',
                    password: await hash('123',8) 
                }
            ]).execute()
  }
}