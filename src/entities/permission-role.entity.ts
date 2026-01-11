import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity('permission_role')
export class PermissionRoleEntity {
  @PrimaryColumn({ name: 'permission_id', type: 'int' })
  permissionId: number;

  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;

  @ManyToOne(() => PermissionEntity, (p) => p.permissionRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;

  @ManyToOne(() => RoleEntity, (r) => r.permissionRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
