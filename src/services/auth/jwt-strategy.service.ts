import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from '../../config/configuration';
import { UserRepository } from '../../repositories/user.repository';
import { TokenPayloadInterface } from '../../interfaces/token-payload.interface';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    if (!configuration().jwtSecret) {
      throw new Error('JWT secret is not defined in configuration.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwtSecret as string,
    });
  }

  async validate(payload: TokenPayloadInterface) {
    const user: UserEntity | null = await this.userRepository.findById(
      payload.sub,
    );
    if (!user)
      throw new UnauthorizedException('User not found for given token');

    return user;
  }
}
