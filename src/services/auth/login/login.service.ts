import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from '../../../controllers/auth/login/DTO/login.DTO';
import { UserRepository } from '../../../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
import { UserEntity } from '../../../entities/user.entity';
import { RefreshTokenRepository } from '../../../repositories/refresh-token.repository';
import { LoginResponseDTO } from '../../../controllers/auth/login/DTO/login-response.DTO';
import { SHA256 } from 'crypto-js';

@Injectable()
export class LoginService {
  private ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  private SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}
  public async login(
    loginDTO: LoginDTO,
    ipAddress: string,
    userAgent: string,
  ): Promise<LoginResponseDTO> {
    const user: UserEntity | null = await this.userRepository.findByEmail(
      loginDTO.email,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid: boolean = compareSync(
      loginDTO.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('User not found');
    }

    const payload = this.createPayload(user);
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.refreshTokenRepository.revokeAllForUserIdAndDevice({
      userId: user.id,
      device: userAgent,
    });

    const hash = SHA256(refreshToken).toString();
    await this.refreshTokenRepository.create({
      userId: user.id,
      hash: hash,
      expiresAt: new Date(Date.now() + this.SEVEN_DAYS_IN_MS),
      ipAddress: ipAddress,
      userAgent: userAgent,
    });

    return new LoginResponseDTO(
      accessToken,
      refreshToken,
      user.id,
      user.name,
      new Date(Date.now() + this.ONE_DAY_IN_MS),
    );
  }

  public async refreshToken(
    refreshToken: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<LoginResponseDTO> {
    let payload: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token', {
        cause: error,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const userId: number = payload.sub;
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token payload');
    }
    const candidates =
      await this.refreshTokenRepository.findValidByUserId(userId);
    const currentTokenHash = SHA256(refreshToken).toString();
    const matchedToken = candidates.find(
      (t) => currentTokenHash === t.tokenHash,
    );

    if (!matchedToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    if (matchedToken.replacedBy !== null) {
      await this.refreshTokenRepository.revokeAllForUserIdAndDevice({
        userId: userId,
        device: userAgent,
      });
      throw new UnauthorizedException('Refresh token has already been used');
    }
    if (matchedToken.revoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const newPayload = this.createPayload(user);
    const newRefreshToken = this.jwtService.sign(newPayload, {
      expiresIn: '7d',
    });

    try {
      const salt = genSaltSync(10);
      const newTokenHash = hashSync(newRefreshToken, salt);
      const newRecord = await this.refreshTokenRepository.create({
        userId,
        hash: newTokenHash,
        expiresAt: new Date(Date.now() + this.SEVEN_DAYS_IN_MS),
        ipAddress: ipAddress,
        userAgent: userAgent,
      });

      matchedToken.replacedBy = newRecord.id.toString();
      matchedToken.revoked = true;
      matchedToken.lastUsedAt = new Date();
      await this.refreshTokenRepository.save(matchedToken);
      const newAccessToken = this.jwtService.sign(newPayload);
      return new LoginResponseDTO(
        newAccessToken,
        newRefreshToken,
        user.id,
        user.name,
        new Date(Date.now() + this.ONE_DAY_IN_MS),
      );
    } catch (error) {
      throw new UnauthorizedException('Failed to generate new refresh token', {
        cause: error,
      });
    }
  }

  private createPayload(user: UserEntity) {
    return { sub: user.id, email: user.email, roles: user.roleUsers };
  }
}
