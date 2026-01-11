import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../../../../repositories/user.repository';
import { RegisterUserDTO } from '../../../../controllers/auth/register/DTO/RegisterUserDTO';
import { UserEntity } from '../../../../entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt-ts';

@Injectable()
export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(registerUserDTO: RegisterUserDTO): Promise<number> {
    const user: UserEntity | null = await this.userRepository.findByEmail(
      registerUserDTO.email,
    );
    if (user) {
      throw new ConflictException('User already exists');
    }

    const salt = genSaltSync(10);
    const passwordHash = hashSync(registerUserDTO.password, salt);
    try {
      return await this.userRepository.createUser(
        registerUserDTO,
        passwordHash,
      );
    } catch (error) {
      throw new InternalServerErrorException('Internal server error', {
        cause: error,
      });
    }
  }
}
