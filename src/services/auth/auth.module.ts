import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RepositoriesModule,
    JwtModule.register({
      global: true,
      secret: configuration().jwtSecret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [LoginService, RegisterService, JwtStrategyService],
  exports: [RegisterService, LoginService, PassportModule],
})
export class AuthModule {}
