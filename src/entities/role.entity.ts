import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from './permission-role.entity';
import { RoleUserEntity } from './role-user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => RoleUserEntity, (ru: RoleUserEntity): RoleEntity => ru.role)
  roleUsers: RoleUserEntity[];

  @OneToMany(
    () => PermissionRoleEntity,
    (pr: PermissionRoleEntity): RoleEntity => pr.role,
  )
  permissionRoles: PermissionRoleEntity[];
}
