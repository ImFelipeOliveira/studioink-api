import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDTO {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsStrongPassword(
    { minLength: 6 },
    { message: 'Password is not strong enough' },
  )
  password: string;
}