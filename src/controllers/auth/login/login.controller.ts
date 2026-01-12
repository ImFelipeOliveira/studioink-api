import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { LoginService } from '../../../services/auth/login/login.service';
import { LoginDTO } from './DTO/login.DTO';
import { LoginResponseDTO } from './DTO/login-response.DTO';
import { type FastifyRequest } from 'fastify';
import { RefreshTokenDTO } from './DTO/refresh-token.DTO';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/token')
  @HttpCode(HttpStatus.OK)
  async token(
    @Body() loginDTO: LoginDTO,
    @Req() request: FastifyRequest,
  ): Promise<LoginResponseDTO> {
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'] || '';

    return this.loginService.login(loginDTO, ipAddress, userAgent);
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body() refreshToken: RefreshTokenDTO,
    @Req() request: FastifyRequest,
  ): Promise<LoginResponseDTO> {
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'] || '';

    return this.loginService.refreshToken(
      refreshToken.refresh_token,
      ipAddress,
      userAgent,
    );
  }
}
