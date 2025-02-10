import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import * as userSchema from './user.schema';
@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE)
    private drizzle: NodePgDatabase<typeof userSchema>,
  ) {}

  async getAllUser() {
    return await this.drizzle.query.users.findMany();
  }
}
