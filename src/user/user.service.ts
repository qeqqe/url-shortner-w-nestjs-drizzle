import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as userSchema from './user.schema';
import { randomUUID } from 'crypto';
@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE)
    private drizzle: NodePgDatabase<typeof userSchema>,
  ) {}

  async getAllUser() {
    return await this.drizzle.query.users.findMany();
  }

  async createUser(userDto: Omit<typeof userSchema.users.$inferInsert, 'id'>) {
    const userData = {
      ...userDto,
      id: randomUUID(),
    };
    return await this.drizzle.insert(userSchema.users).values(userData);
  }
}
