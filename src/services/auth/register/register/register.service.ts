import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../../../../repositories/user.repository';
import { RegisterUserDTO } from '../../../../controllers/auth/register/DTO/RegisterUserDTO';
import { UserEntity } from '../../../../entities/user.entity';

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

    try {
      return await this.userRepository.createUser(registerUserDTO);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error', {
        cause: error,
      });
    }
  }
}
