import { IsString } from 'class-validator';

export class RefreshTokenDTO {
  @IsString({ message: 'Refresh token is required' })
  refresh_token: string;
}
