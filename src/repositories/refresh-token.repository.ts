import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from '../database/database.provider';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  private repository: Repository<RefreshTokenEntity>;
  constructor(@Inject(DATA_SOURCE) private readonly database: DataSource) {
    this.repository = database.getRepository(RefreshTokenEntity);
  }

  async save(entity: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    return this.repository.save(entity);
  }

  async create(data: {
    userId: number;
    hash: string;
    expiresAt: Date;
    ipAddress: string;
    userAgent: string;
  }): Promise<RefreshTokenEntity> {
    const refresh = this.repository.create({
      userId: data.userId,
      tokenHash: data.hash,
      expiresAt: data.expiresAt,
      ip: data.ipAddress,
      userAgent: data.userAgent,
    });
    await this.repository.save(refresh);
    return refresh;
  }

  async findValidByUserId(userId: number) {
    return this.repository.find({
      where: {
        userId: userId,
        expiresAt: MoreThan(new Date()),
      },
    });
  }

  async revokeAllForUserId(userId: number): Promise<void> {
    const tokens = await this.repository.find({
      where: { userId: userId, revoked: false },
    });
    const revokedTokens: RefreshTokenEntity[] = [];
    for (const token of tokens) {
      token.revoked = true;
      revokedTokens.push(token);
    }
    await this.repository.save(revokedTokens);
  }

  async revokeAllForUserIdAndDevice(data: {
    userId: number;
    device: string;
  }): Promise<void> {
    const tokens = await this.repository.find({
      where: { userId: data.userId, userAgent: data.device, revoked: false },
    });
    const revokedTokens: RefreshTokenEntity[] = [];
    for (const token of tokens) {
      token.revoked = true;
      revokedTokens.push(token);
    }
    await this.repository.save(revokedTokens);
  }

  async deleteByUserAndDevice(data: {
    userId: number;
    ipAddress: string;
    userAgent: string;
  }): Promise<void> {
    await this.repository.delete({
      userId: data.userId,
      ip: data.ipAddress,
      userAgent: data.userAgent,
    });
  }
}
