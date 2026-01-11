import { UserEntity } from '../entities/user.entity';
import { DATA_SOURCE } from '../database/database.provider';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RegisterUserDTO } from '../controllers/auth/register/DTO/RegisterUserDTO';

@Injectable()
export class UserRepository {
  private repository: Repository<UserEntity>;
  constructor(@Inject(DATA_SOURCE) private readonly database: DataSource) {
    this.repository = database.getRepository(UserEntity);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { email: email } });
  }

  public async createUser(registerUserDTO: RegisterUserDTO): Promise<number> {
    const user: UserEntity = this.repository.create({
      ...registerUserDTO,
    });
    await this.repository.save(user);
    return user.id;
  }
}
