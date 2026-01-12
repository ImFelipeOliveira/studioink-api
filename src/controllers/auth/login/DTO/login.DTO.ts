import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  ipAddress: string;

  @IsOptional()
  userAgent: string;
}
