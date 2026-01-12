import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database/database.provider';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';
import { RepositoriesModule } from './repositories/repositories.module';
import { RegisterController } from './controllers/auth/register/register.controller';
import { AuthModule } from './services/auth/auth.module';
import { LoginController } from './controllers/auth/login/login.controller';
import { PlansController } from './controllers/plans.controller';

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
  controllers: [RegisterController, LoginController, PlansController],
})
export class AppModule {}
