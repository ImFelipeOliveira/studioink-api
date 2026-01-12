import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterService } from '../../../services/auth/register/register.service';
import { RegisterUserDTO } from './DTO/RegisterUserDTO';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const userId = await this.registerService.registerUser(registerUserDTO);
    return { id: userId };
  }
}
