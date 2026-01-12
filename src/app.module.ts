import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database/database.provider';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';
import { RepositoriesModule } from './repositories/repositories.module';
import { RegisterController } from './controllers/auth/register/register.controller';
import { AuthModule } from './services/auth/auth.module';
import { LoginController } from './controllers/auth/login/login.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    RepositoriesModule,
    AuthModule,
  ],
  providers: [DatabaseProvider, AuthModule],
  controllers: [RegisterController, LoginController],
})
export class AppModule {}
