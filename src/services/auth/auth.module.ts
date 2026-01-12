import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { RepositoriesModule } from '../../repositories/repositories.module';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      global: true,
      secret: configuration().jwtSecret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [LoginService, RegisterService],
  exports: [RegisterService, LoginService],
})
export class AuthModule {}
