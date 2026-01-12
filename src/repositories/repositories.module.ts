import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RefreshTokenRepository } from './refresh-token.repository';

@Module({
  providers: [UserRepository, RefreshTokenRepository],
  exports: [UserRepository, RefreshTokenRepository],
})
export class RepositoriesModule {}
