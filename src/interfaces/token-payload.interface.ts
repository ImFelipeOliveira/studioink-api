import { RoleUserEntity } from '../entities/role-user.entity';

export interface TokenPayloadInterface {
  sub: number;
  email: string;
  roles: RoleUserEntity[] | null;
  jit: string;
}
