import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database/database.provider';
import { DatabaseModule } from './database/database.module';
import { LoginService } from './services/auth/login/login/login.service';
import configuration from './config/configuration';
import { RepositoriesModule } from './repositories/repositories.module';
import { RegisterService } from './services/auth/register/register/register.service';
import { RegisterController } from './controllers/auth/register/register.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    RepositoriesModule,
  ],
  providers: [DatabaseProvider, RegisterService, LoginService],
  controllers: [RegisterController],
})
export class AppModule {}
