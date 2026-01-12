import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from '../database/database.provider';
import { DataSource, Repository } from 'typeorm';
import { RoleUserEntity } from '../entities/role-user.entity';

@Injectable()
export class RoleUserRepository {
  private repository: Repository<RoleUserEntity>;
  constructor(@Inject(DATA_SOURCE) private readonly database: DataSource) {
    this.repository = database.getRepository(RoleUserEntity);
  }

  async findByUserId(userId: number): Promise<RoleUserEntity[]> {
    return await this.repository.find({ where: { userId: userId } });
  }
}
